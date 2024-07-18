import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetStaffServicesByUserIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id },
      })
      .services();
  }
}
