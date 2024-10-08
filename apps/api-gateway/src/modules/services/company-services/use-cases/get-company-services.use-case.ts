import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';

@Injectable()
export class GetCompanyServicesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.companyService.findMany({ orderBy: { order: 'asc' } });
  }
}
