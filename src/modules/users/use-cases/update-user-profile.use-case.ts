import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserProfileInput } from '../dto/update-user-profile.input';
import { UploadService } from 'src/modules/common/upload/upload.service';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async execute(id: number, updateUserProfileInput: UpdateUserProfileInput) {
    const { avatar, ...data } = updateUserProfileInput;
    let avatarUrl: string[];

    if (avatar) {
      const { avatar: oldAvatar } =
        await this.prisma.userProfile.findUniqueOrThrow({ where: { id } });

      avatarUrl = await this.uploadService.uploadImages(avatar);

      this.uploadService.removeImages(oldAvatar);
    }

    return this.prisma.userProfile.update({
      where: { id },
      data: { ...data, avatar: avatarUrl?.[0] },
    });
  }
}
