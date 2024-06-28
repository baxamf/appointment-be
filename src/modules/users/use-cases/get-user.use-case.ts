import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
