import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateStaffServiceInput } from '../dto/update-staff-service.input';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class UpdateStaffServiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(id: number, updateStaffServiceInput: UpdateStaffServiceInput) {
    const { image, ...data } = updateStaffServiceInput;
    let imageUrl: string[];

    if (image) {
      const { image: oldImage } =
        await this.prisma.staffService.findUniqueOrThrow({ where: { id } });
      imageUrl = await this.uploadService.uploadImages(image);

      this.uploadService.removeImages(oldImage);
    }

    return this.prisma.staffService.update({
      where: { id },
      data: { ...data, image: imageUrl?.[0] },
    });
  }
}
