import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { FileUpload } from 'graphql-upload-minimal';
import * as path from 'path';
import { IAppConfig } from 'src/config/app.config';
import { ConfigName } from 'src/config/config-names.enum';
import { UploadServiceInterface } from '../interfaces/upload-service.interface';

@Injectable()
export class UploadService implements UploadServiceInterface {
  private readonly appConfig: IAppConfig;
  private readonly uploadDir: string;
  private readonly logger = new Logger('UploadService');

  constructor(private readonly configService: ConfigService) {
    this.appConfig = configService.get<IAppConfig>(ConfigName.APP);
    this.uploadDir = this.appConfig.assetsFolder;
    fs.mkdirSync(this.uploadDir, { recursive: true });
  }

  async uploadImages(...images: Promise<FileUpload>[]) {
    const imageUrls: string[] = [];

    for (const image of images) {
      try {
        const { createReadStream, mimetype } = await image;

        const fileType = mimetype.split('/')[1];
        const fileName = `${randomUUID()}.${fileType}`;
        const filePath = path.join(this.uploadDir, fileName);

        const out = fs.createWriteStream(filePath);
        createReadStream().pipe(out);

        await new Promise((resolve, reject) => {
          out.on('finish', resolve);
          out.on('error', reject);
        });

        const imageUrl = [
          this.appConfig.apiUrl,
          this.appConfig.assetsFolderPrefix,
          fileName,
        ].join('/');

        imageUrls.push(imageUrl);
      } catch (error) {
        this.logger.error(error);
        this.removeImages(...imageUrls);
      }
    }

    return imageUrls;
  }

  removeImages(...images: string[]) {
    for (const image of images) {
      try {
        const imgPath = image.replace(this.appConfig.apiUrl, '');

        fs.unlinkSync(path.join(process.cwd(), imgPath));
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
}
