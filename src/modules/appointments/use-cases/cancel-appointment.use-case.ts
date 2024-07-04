import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(appointmentId: number) {
    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED',
      },
    });
  }
}
