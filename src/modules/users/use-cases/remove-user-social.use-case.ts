import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RemoveUserSocialUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, socialId: number) {
    return this.prisma.userSocial.delete({ where: { userId, id: socialId } });
  }
}
