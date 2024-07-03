import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetCompanyServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(companyServiceId: number) {
    return this.prisma.companyService.findUnique({
      where: { id: companyServiceId },
    });
  }
}
