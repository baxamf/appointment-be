import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateCompanyServiceInput } from '../dto/create-company-service.input';
import { IAppConfig } from '@config/app.config';
import { UploadService } from '@common';

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
