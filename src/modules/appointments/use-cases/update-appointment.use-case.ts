import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(updateAppointmentInput: UpdateAppointmentInput) {
    const { id, ...appointmentData } = updateAppointmentInput;

    return this.prisma.appointment.update({
      where: { id },
      data: appointmentData,
    });
  }
}
