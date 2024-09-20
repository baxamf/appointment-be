import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { IAppConfig } from '@config/app.config';
import { ConfigName } from '@config/config-names.enum';
import { JwtUserPayload } from '@api/modules/common/types';

@Injectable()
export class JwtRefreshCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-cookie',
) {
  constructor(private readonly configService: ConfigService) {
    const cfg = configService.get<IAppConfig>(ConfigName.APP);

    super({
      jwtFromRequest: (req: Request) => req?.cookies['jwt'] || null,
      ignoreExpiration: false,
      secretOrKey: cfg.jwtRefreshSecret,
    });
  }

  async validate(payload: JwtUserPayload) {
    return payload;
  }
}
