import { registerAs } from '@nestjs/config';
import { ConfigName } from './config-names.enum';

export interface IAppConfig {
  env: string;
  port: number;
}

export const appConfig = registerAs(ConfigName.APP, () => {
  const env = process.env.ENV || 'dev';
  const port = +process.env.PORT || 5000;

  const config: IAppConfig = {
    env,
    port,
  };

  if (Object.values(config).includes(undefined)) {
    throw new Error('[AppConfig]: Invalid configuration');
  }

  return config;
});
