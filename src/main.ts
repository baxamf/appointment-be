import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from './config/config-names.enum';
import { IAppConfig } from './config/app.config';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { credentials: true, origin: true },
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(ConfigName.APP);

  app.use(graphqlUploadExpress(appConfig.uploadOptions));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useStaticAssets(`${appConfig.assetsFolder}`, {
    prefix: `/${appConfig.assetsFolderPrefix}`,
  });

  const logger = new Logger('App');
  await app.listen(appConfig.port, () => {
    logger.log(
      `🚀 Server started successfully in ${appConfig.env} mode at port: ${appConfig.port}`,
    );
  });
}
bootstrap();
