import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateServiceTagInput } from '../dto/update-service-tag.input';

@Injectable()
export class UpdateServiceTagUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(updateServiceTagInput: UpdateServiceTagInput) {
    const { id, ...ServiceTagData } = updateServiceTagInput;

    return this.prisma.serviceTag.update({
      where: { id },
      data: ServiceTagData,
    });
  }
}
