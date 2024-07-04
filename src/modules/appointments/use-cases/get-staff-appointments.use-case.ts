import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetStaffAppointmentsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(staffUserId: number) {
    return this.prisma.user
      .findUnique({ where: { id: staffUserId } })
      .staffAppointments({ orderBy: { targetTime: 'desc' } });
  }
}
