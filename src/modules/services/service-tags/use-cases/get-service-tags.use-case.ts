import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetServiceTagsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.serviceTag.findMany();
  }
}
