import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfile } from './entities/user-profile.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { UpdateUserProfileUseCase } from './use-cases/update-user-profile.use-case';

@Resolver(() => UserProfile)
export class UserProfilesResolver {
  constructor(
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserProfile, { description: 'Get my profile data' })
  async getMyProfile(@CurrentUser('id') id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } }).profile();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserProfile)
  updateMyProfile(
    @CurrentUser('id') id: number,
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ) {
    return this.updateUserProfileUseCase.execute(id, updateUserProfileInput);
  }
}
