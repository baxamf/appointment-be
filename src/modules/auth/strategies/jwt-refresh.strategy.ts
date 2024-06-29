import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppConfig } from 'src/config/app.config';
import { ConfigName } from 'src/config/config-names.enum';
import { JwtUserPayload } from 'src/modules/common/types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    const cfg = configService.get<IAppConfig>(ConfigName.APP);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: cfg.jwtSecret,
    });
  }

  async validate(payload: JwtUserPayload) {
    console.log(payload);
    return payload;
  }
}
