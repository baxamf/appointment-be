import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RemoveCompanyServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(companyServiceId: number) {
    return this.prisma.companyService.delete({
      where: { id: companyServiceId },
    });
  }
}
