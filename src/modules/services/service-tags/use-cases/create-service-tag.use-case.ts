import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateServiceTagInput } from '../dto/create-service-tag.input';

@Injectable()
export class CreateServiceTagUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    companyServiceId: number,
    createServiceTagInput: CreateServiceTagInput,
  ) {
    return this.prisma.serviceTag.create({
      data: {
        ...createServiceTagInput,
        companyServices: { connect: { id: companyServiceId } },
      },
    });
  }
}
