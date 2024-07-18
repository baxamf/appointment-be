import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserSocialInput } from './dto/update-user-social.input';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from './entities/user-response.entity';
import { UserProfile } from './entities/user-profile.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UserSocial } from './entities/user-social.entity';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { CreateUserProfileUseCase } from './use-cases/create-user-profile.use-case';
import { CreateUserSocialInput } from './dto/create-user-social.input';
import { CreateUserSocialUseCase } from './use-cases/create-user-social.use-case';
import { RemoveUserSocialUseCase } from './use-cases/remove-user-social.use-case';
import { UpdateUserSocialUseCase } from './use-cases/update-user-social.use-case';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { UpdateUserProfileUseCase } from './use-cases/update-user-profile.use-case';
import { GetStaffUseCase } from './use-cases/get-staff.use-case';

@Resolver(() => UserResponse)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getStaffUseCase: GetStaffUseCase,
    private readonly createUserProfileUseCase: CreateUserProfileUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly createUserSocialUseCase: CreateUserSocialUseCase,
    private readonly updateUserSocialUseCase: UpdateUserSocialUseCase,
    private readonly removeUserSocialUseCase: RemoveUserSocialUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => UserResponse)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    console.log(createUserInput);
    return this.createUserUseCase.execute(
      createUserInput,
      createUserProfileInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserResponse], { description: 'Get staff' })
  async getStaff() {
    return this.getStaffUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResponse, { description: 'Get user by id' })
  async getUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.getUserUseCase.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResponse, { description: 'Get my user data' })
  async getMe(@CurrentUser('id') id: number) {
    return this.getUserUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserProfile)
  createMyProfile(
    @CurrentUser('id') id: number,
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.createUserProfileUseCase.execute(id, createUserProfileInput);
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
    return this.removeUserSocialUseCase.execute(id, socialId);
  }

  @ResolveField('profile', () => UserProfile, { nullable: true })
  getUserProfile(@Parent() user: UserResponse) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).profile();
  }

  @ResolveField('socials', () => [UserSocial], { nullable: true })
  getUserSocials(@Parent() user: UserResponse) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).socials();
  }
}
