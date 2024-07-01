import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserSocialInput } from '../dto/update-user-social.input';

@Injectable()
export class UpdateUserSocialUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, updateUserSocialInput: UpdateUserSocialInput) {
    const { id, ...userSocialData } = updateUserSocialInput;

    return this.prisma.userSocial.update({
      where: { userId, id },
      data: userSocialData,
    });
  }
}
