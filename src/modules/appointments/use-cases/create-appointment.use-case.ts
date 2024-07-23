import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { CustomerDataInput } from '../dto/customer-data.input';
import { hash } from 'bcrypt';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    createAppointmentInput: CreateAppointmentInput,
    customerDataInput: CustomerDataInput,
  ) {
    const { email, ...profile } = customerDataInput;
    const { staffId, staffServiceId, ...appointment } = createAppointmentInput;

    const password = await hash('password', 10);

    return this.prisma.appointment.create({
      data: {
        ...appointment,
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
