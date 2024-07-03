import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RemoveServiceTagUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(ServiceTagId: number) {
    return this.prisma.serviceTag.delete({
      where: { id: ServiceTagId },
    });
  }
}
