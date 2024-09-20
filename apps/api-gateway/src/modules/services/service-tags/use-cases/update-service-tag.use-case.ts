import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { UpdateServiceTagInput } from '../dto/update-service-tag.input';

@Injectable()
export class UpdateServiceTagUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    serviceTagId: number,
    updateServiceTagInput: UpdateServiceTagInput,
  ) {
    return this.prisma.serviceTag.update({
      where: { id: serviceTagId },
      data: updateServiceTagInput,
    });
  }
}
