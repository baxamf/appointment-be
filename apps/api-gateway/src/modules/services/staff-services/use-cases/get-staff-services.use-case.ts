import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { GetStaffServicesInput } from '../dto/get-staff-services-input';

@Injectable()
export class GetStaffServicesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(getStaffServicesInput: GetStaffServicesInput) {
    return this.prisma.staffService.findMany({
      where: {
        serviceId: getStaffServicesInput.serviceId,
      },
    });
  }
}
