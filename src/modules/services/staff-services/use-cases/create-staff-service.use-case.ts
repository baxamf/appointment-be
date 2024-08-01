import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateStaffServiceInput } from '../dto/create-staff-service.input';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class CreateStaffServiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(
    userId: number,
    createStaffServiceInput: CreateStaffServiceInput,
  ) {
    const { image, ...data } = createStaffServiceInput;
    let imageUrl: string[];

    if (image) {
      imageUrl = await this.uploadService.uploadImages(image);
    }

    return this.prisma.staffService.create({
      data: { userId, ...data, image: imageUrl?.[0] },
    });
  }
}
