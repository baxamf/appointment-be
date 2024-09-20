import { registerAs } from '@nestjs/config';
import { ConfigName } from './config-names.enum';
import { DAY } from '@common/constants/time';
import { UploadOptions } from 'graphql-upload-minimal';
import { join } from 'path';

export interface IAppConfig {
  env: string;
  apiUrl: string;
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  jwtRefreshCacheExpiresIn: number;
  uploadOptions: UploadOptions;
  assetsFolderPrefix: string;
  assetsFolder: string;
}

export const appConfig = registerAs(ConfigName.APP, () => {
  const config: IAppConfig = {
    env: process.env.ENV || 'DEV',
    apiUrl: process.env.API_URL,
    port: +process.env.PORT || 5000,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    jwtRefreshCacheExpiresIn:
      +process.env.JWT_REFRESH_EXPIRES_IN.slice(0, -1) * DAY,

    uploadOptions: {
      maxFiles: +process.env.MAX_UPLOAD_FILES || 5,
      maxFileSize: (+process.env.MAX_FILE_SIZE || 1) * 1000000,
    },

    assetsFolderPrefix: process.env.PUBLIC_ASSETS_FOLDER,
    assetsFolder: join(process.cwd(), process.env.PUBLIC_ASSETS_FOLDER),
  };

  if (Object.values(config).includes(undefined)) {
    throw new Error('[AppConfig]: Invalid configuration');
  }

  return config;
});
