import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserProfileInput } from '../dto/update-user-profile.input';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, updateUserProfileInput: UpdateUserProfileInput) {
    return this.prisma.userProfile.update({
      where: { id },
      data: updateUserProfileInput,
    });
  }
}
