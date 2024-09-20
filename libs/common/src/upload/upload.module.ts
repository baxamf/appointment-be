import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@config/app.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
