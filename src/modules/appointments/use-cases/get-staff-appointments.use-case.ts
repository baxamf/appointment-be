import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { GetAppointmentFilterInput } from '../dto/get-appointment-filter.input';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class GetStaffAppointmentsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    staffUserId: number,
    getAppointmentFilterInput: GetAppointmentFilterInput,
  ) {
    const { targetTime } = { ...getAppointmentFilterInput };

    return this.prisma.user
      .findUnique({ where: { id: staffUserId } })
      .staffAppointments({
        orderBy: { targetTime: 'desc' },
        where: {
          targetTime: targetTime && {
            gte: startOfDay(targetTime),
            lte: endOfDay(targetTime),
          },
        },
      });
  }
}
