import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppConfig } from 'src/config/app.config';
import { ConfigName } from 'src/config/config-names.enum';
import { jwtRefreshTokenCacheKey } from 'src/modules/caching/cache.keys';
import { CachingService } from 'src/modules/caching/caching.service';
import { JwtUserPayload } from 'src/modules/common/types';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private appCfg: IAppConfig;
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly cache: CachingService,
    private readonly jwtService: JwtService,
  ) {
    const cfg = configService.get<IAppConfig>(ConfigName.APP);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: cfg.jwtSecret,
    });

    this.appCfg = cfg;
  }

  async validate(payload: JwtUserPayload) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: payload.userId },
    });

    const cacheKey = jwtRefreshTokenCacheKey(payload.userId);

    const refreshToken = await this.cache.getToken(cacheKey);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    await this.jwtService.verifyAsync(refreshToken, {
      secret: this.appCfg.jwtRefreshSecret,
      ignoreExpiration: false,
    });

    return user;
  }
}