import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload/upload.service';

@Global()
@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class CommonModule {}
