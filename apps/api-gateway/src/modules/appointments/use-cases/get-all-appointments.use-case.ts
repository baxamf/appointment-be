import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { GetAppointmentFilterInput } from '../dto/get-appointment-filter.input';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class GetAllAppointmentsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(getAppointmentFilterInput: GetAppointmentFilterInput) {
    const { targetTime, companyServiceId, staffServiceId, staffId } = {
      ...getAppointmentFilterInput,
    };

    return this.prisma.appointment.findMany({
      orderBy: { targetTime: 'desc' },
      where: {
        targetTime: targetTime && {
          gte: startOfDay(targetTime),
          lte: endOfDay(targetTime),
        },
        staffId,
        staffServiceId,
        staffService: companyServiceId && {
          serviceId: companyServiceId,
        },
      },
    });
  }
}
