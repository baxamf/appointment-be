import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from './config/config-names.enum';
import { IAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { credentials: true, origin: true },
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(ConfigName.APP);

  const logger = new Logger('App');
  await app.listen(3000, () => {
    logger.log(
      `🚀 Server started successfully in ${appConfig.env} mode at port: ${appConfig.port}`,
    );
  });
}
bootstrap();
