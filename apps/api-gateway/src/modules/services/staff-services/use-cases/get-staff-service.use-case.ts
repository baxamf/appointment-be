import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';

@Injectable()
export class GetStaffServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(StaffServiceId: number) {
    return this.prisma.staffService.findUnique({
      where: { id: StaffServiceId },
    });
  }
}
