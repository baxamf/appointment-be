import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { add, endOfDay, set, startOfDay, sub } from 'date-fns';
import { GetAppointmentAvailableTimesInput } from '../dto/get-appointment-available-times.input';
import { GetAppointmentAvailableTimesOutput } from '../dto/get-appointment-available-times.output';

@Injectable()
export class GetAppointmentAvailableTimesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    getAppointmentAvailableTimesInput: GetAppointmentAvailableTimesInput,
  ) {
    const { targetTime, staffServiceId, staffId } =
      getAppointmentAvailableTimesInput;
    const day = new Date(targetTime).getDay();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: staffId },
      include: {
        workingDays: { where: { day } },
        services: { where: { id: staffServiceId } },
        staffAppointments: {
          where: {
            targetTime: {
              gte: startOfDay(targetTime),
              lte: endOfDay(targetTime),
            },
          },
        },
      },
    });

    const { workingDays, services, staffAppointments } = user;

    if (!workingDays[0] || !services[0]) {
      return [];
    }

    const { startHour, startMinute, endHour, endMinute } = workingDays[0];
    const { duration } = services[0];
    const existingAppointmentsTimes = staffAppointments.map(
      ({ targetTime }) => +targetTime,
    );

    let startTime = set(new Date(targetTime), {
      hours: startHour,
      minutes: startMinute,
      seconds: 0,
      milliseconds: 0,
    });

    const endTime = set(new Date(targetTime), {
      hours: endHour,
      minutes: endMinute,
      seconds: 0,
      milliseconds: 0,
    });

    const availableTimes: GetAppointmentAvailableTimesOutput[] = [];

    while (startTime <= sub(endTime, { minutes: duration })) {
      if (!existingAppointmentsTimes.includes(+startTime)) {
        availableTimes.push({ targetTime: startTime });
      }

      startTime = add(startTime, { minutes: duration });
    }

    return availableTimes;
  }
}
