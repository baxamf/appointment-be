import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateUserSocialInput } from '../dto/create-user-social.input';

@Injectable()
export class CreateUserSocialUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, createUserSocialInput: CreateUserSocialInput) {
    return this.prisma.userSocial.create({
      data: { userId, ...createUserSocialInput },
    });
  }
}
