import { registerAs } from '@nestjs/config';
import { ConfigName } from './config-names.enum';

export interface IAppConfig {
  env: string;
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const appConfig = registerAs(ConfigName.APP, () => {
  const config: IAppConfig = {
    env: process.env.ENV || 'DEV',
    port: +process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  };

  if (Object.values(config).includes(undefined)) {
    throw new Error('[AppConfig]: Invalid configuration');
  }

  return config;
});
