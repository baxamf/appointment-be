import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserSocialUseCase } from './use-cases/create-user-social.use-case';
import { UpdateUserSocialUseCase } from './use-cases/update-user-social.use-case';
import { UserSocial } from './entities/user-social.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreateUserSocialInput } from './dto/create-user-social.input';
import { UpdateUserSocialInput } from './dto/update-user-social.input';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => UserSocial)
export class UserSocialsResolver {
  constructor(
    private readonly createUserSocialUseCase: CreateUserSocialUseCase,
    private readonly updateUserSocialUseCase: UpdateUserSocialUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserSocial)
  createMySocial(
    @CurrentUser('id') id: number,
    @Args('createUserSocialInput')
    createUserSocialInput: CreateUserSocialInput,
  ) {
    return this.createUserSocialUseCase.execute(id, createUserSocialInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserSocial)
  updateMySocial(
    @CurrentUser('id') id: number,
    @Args('updateUserSocialInput')
    updateUserSocialInput: UpdateUserSocialInput,
  ) {
    return this.updateUserSocialUseCase.execute(id, updateUserSocialInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserSocial)
  removeMySocial(
    @CurrentUser('id') id: number,
    @Args('socialId', { type: () => Int }) socialId: number,
  ) {
    return this.prisma.userSocial.delete({
      where: { userId: id, id: socialId },
    });
  }
}
