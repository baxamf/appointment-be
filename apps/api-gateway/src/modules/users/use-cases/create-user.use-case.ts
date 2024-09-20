import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateUserInput } from '../dto/create-user.input';
import { hash } from 'bcrypt';
import { CreateUserProfileInput } from '../dto/create-user-profile.input';
import { UploadService } from '@common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(
    createUserInput: CreateUserInput,
    createUserProfileInput: CreateUserProfileInput,
  ) {
    const { password, ...userData } = createUserInput;
    const { avatar, ...profileData } = createUserProfileInput;
    let avatarUrl: string[];

    const hashedPass = await hash(password, 10);

    if (avatar) {
      avatarUrl = await this.uploadService.uploadImages(avatar);
    }

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPass,
        profile: {
          create: { ...profileData, avatar: avatarUrl?.[0] },
        },
      },
    });
  }
}
