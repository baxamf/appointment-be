import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetStaffServicesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.staffService.findMany();
  }
}
