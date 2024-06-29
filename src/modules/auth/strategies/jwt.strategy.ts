import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppConfig } from 'src/config/app.config';
import { ConfigName } from 'src/config/config-names.enum';
import { JwtUserPayload } from 'src/modules/common/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const cfg = configService.get<IAppConfig>(ConfigName.APP);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.jwtSecret,
    });
  }

  async validate(payload: JwtUserPayload) {
    return payload;
  }
}
