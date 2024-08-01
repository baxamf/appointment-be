import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCompanyServiceInput } from '../dto/update-company-service.input';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class UpdateCompanyServiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(
    companyServiceId: number,
    updateCompanyServiceInput: UpdateCompanyServiceInput,
  ) {
    const { image, ...data } = updateCompanyServiceInput;
    let imageUrl: string[];

    if (image) {
      const { image: oldImage } =
        await this.prisma.companyService.findUniqueOrThrow({
          where: { id: companyServiceId },
        });

      imageUrl = await this.uploadService.uploadImages(image);

      this.uploadService.removeImages(oldImage);
    }

    return this.prisma.companyService.update({
      where: { id: companyServiceId },
      data: { ...data, image: imageUrl?.[0] },
    });
  }
}
