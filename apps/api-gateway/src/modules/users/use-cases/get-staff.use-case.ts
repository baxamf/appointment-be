import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { GetStaffInput } from '../dto/get-staff.input';

@Injectable()
export class GetStaffUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(getStaffInput: GetStaffInput) {
    return this.prisma.user.findMany({
      where: {
        role: 'STAFF',
        services: { some: { serviceId: getStaffInput?.serviceId } },
      },
    });
  }
}
