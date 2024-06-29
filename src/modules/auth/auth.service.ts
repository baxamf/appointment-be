import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/config/app.config';
import { ConfigName } from 'src/config/config-names.enum';
import { compare } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtUserPayload } from '../common/types';
import { CachingService } from '../caching/caching.service';
import { jwtRefreshTokenCacheKey } from '../caching/cache.keys';

@Injectable()
export class AuthService {
  private readonly appConfig: IAppConfig;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly cache: CachingService,
    private readonly configService: ConfigService,
  ) {
    this.appConfig = configService.get<IAppConfig>(ConfigName.APP);
  }
  async authenticate(loginInput: LoginInput) {
    const { email, password } = loginInput;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPassValid = await compare(password, user.password);

    if (!isPassValid) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  async generateTokens(user: User) {
    const payload: JwtUserPayload = { userId: user.id, email: user.email };
    const tokenCacheKey = jwtRefreshTokenCacheKey(user.id);
    const refreshTokenTtl = this.appConfig.jwtRefreshCacheExpiresIn;

    const [accessToken, refreshToken] = await Promise.all([
      this._generateAccessToken(payload),

      this._generateRefreshToken(payload),
    ]);

    await this.cache.setToken(tokenCacheKey, refreshToken, refreshTokenTtl);

    return { accessToken, refreshToken };
  }

  private async _generateAccessToken(payload: JwtUserPayload) {
    const { jwtSecret, jwtExpiresIn } = this.appConfig;

    return await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: jwtExpiresIn,
    });
  }

  private async _generateRefreshToken(payload: JwtUserPayload) {
    const { jwtRefreshSecret, jwtRefreshExpiresIn } = this.appConfig;

    return await this.jwtService.signAsync(payload, {
      secret: jwtRefreshSecret,
      expiresIn: jwtRefreshExpiresIn,
    });
  }
}
