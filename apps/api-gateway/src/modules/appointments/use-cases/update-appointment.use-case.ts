import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';
import { UploadService } from '@common';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(updateAppointmentInput: UpdateAppointmentInput) {
    const { id, images, ...appointmentData } = updateAppointmentInput;
    let imageUrls: string[];

    if (images) {
      const { images: oldImages } =
        await this.prisma.appointment.findUniqueOrThrow({ where: { id } });

      imageUrls = await this.uploadService.uploadImages(...images);

      this.uploadService.removeImages(...oldImages);
    }

    return this.prisma.appointment.update({
      where: { id },
      data: { ...appointmentData, images: imageUrls },
    });
  }
}
