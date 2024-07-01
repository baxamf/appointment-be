import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserProfileInput } from '../dto/create-user-profile.input';

@Injectable()
export class CreateUserProfileUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    userId: number,
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.prisma.userProfile.upsert({
      where: { id: userId },
      create: { id: userId, ...createUserProfileInput },
      update: createUserProfileInput,
    });
  }
}
