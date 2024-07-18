import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateStaffServiceInput } from '../dto/update-staff-service.input';

@Injectable()
export class UpdateStaffServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, updateStaffServiceInput: UpdateStaffServiceInput) {
    return this.prisma.staffService.update({
      where: { id },
      data: updateStaffServiceInput,
    });
  }
}
