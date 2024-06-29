import { registerAs } from '@nestjs/config';
import { ConfigName } from './config-names.enum';
import { DAY } from 'src/modules/common/constants/time';

export interface IAppConfig {
  env: string;
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  jwtRefreshCacheExpiresIn: number;
}

export const appConfig = registerAs(ConfigName.APP, () => {
  const config: IAppConfig = {
    env: process.env.ENV || 'DEV',
    port: +process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    jwtRefreshCacheExpiresIn:
      +process.env.JWT_REFRESH_EXPIRES_IN.slice(0, -1) * DAY,
  };

  if (Object.values(config).includes(undefined)) {
    throw new Error('[AppConfig]: Invalid configuration');
  }

  return config;
});
