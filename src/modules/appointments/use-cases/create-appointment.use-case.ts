import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { CustomerDataInput } from '../dto/customer-data.input';
import { hash } from 'bcrypt';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(
    createAppointmentInput: CreateAppointmentInput,
    customerDataInput: CustomerDataInput,
  ) {
    const { email, ...profile } = customerDataInput;
    const { staffId, staffServiceId, images, ...appointment } =
      createAppointmentInput;
    let imagesUrls: string[];

    const password = await hash('password', 10);

    if (images) {
      imagesUrls = await this.uploadService.uploadImages(...images);
    }

    return this.prisma.appointment.create({
      data: {
        ...appointment,
        images: imagesUrls,
        staff: {
          connect: { id: staffId },
        },
        staffService: {
          connect: { id: staffServiceId },
        },
        customer: {
          create: {
            email,
            password,
            role: 'USER',
            profile: { create: profile },
          },
        },
      },
    });
  }
}
