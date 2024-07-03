import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetServiceTagUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(ServiceTagId: number) {
    return this.prisma.serviceTag.findUnique({
      where: { id: ServiceTagId },
    });
  }
}
