import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAppointmentInput } from '../dto/create-appointment.input';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createAppointmentInput: CreateAppointmentInput) {
    return this.prisma.appointment.create({
      data: createAppointmentInput,
    });
  }
}
