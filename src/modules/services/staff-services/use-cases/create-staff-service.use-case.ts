import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateStaffServiceInput } from '../dto/create-staff-service.input';

@Injectable()
export class CreateStaffServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    userId: number,
    createStaffServiceInput: CreateStaffServiceInput,
  ) {
    return this.prisma.staffService.create({
      data: { userId, ...createStaffServiceInput },
    });
  }
}
