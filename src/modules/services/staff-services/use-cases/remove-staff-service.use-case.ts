import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RemoveStaffServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(staffServiceId: number) {
    return this.prisma.staffService.delete({
      where: { id: staffServiceId },
    });
  }
}
