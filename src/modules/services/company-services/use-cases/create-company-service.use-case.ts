import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCompanyServiceInput } from '../dto/create-company-service.input';
import { IAppConfig } from 'src/config/app.config';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class CreateCompanyServiceUseCase {
  private readonly appConfig: IAppConfig;

  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(createCompanyServiceInput: CreateCompanyServiceInput) {
    const { image, ...data } = createCompanyServiceInput;

    const imageUrl = await this.uploadService.uploadImages(image);

    return this.prisma.companyService.create({
      data: { ...data, image: imageUrl[0] },
    });
  }
}
