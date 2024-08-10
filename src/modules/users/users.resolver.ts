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
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfile } from './entities/user-profile.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UserSocial } from './entities/user-social.entity';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { UpdateUserProfileUseCase } from './use-cases/update-user-profile.use-case';
import { GetStaffUseCase } from './use-cases/get-staff.use-case';
import { GetStaffInput } from './dto/get-staff.input';
import { UserWorkingDay } from './entities/user-working-day.entity';
import { User } from './entities/user.entity';
import { StaffService } from '../services/staff-services/entities/staff-service.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getStaffUseCase: GetStaffUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ) {
    return this.createUserUseCase.execute(
      createUserInput,
      createUserProfileInput,
    );
  }

  @Query(() => [User], { description: 'Get staff' })
  async getStaff(
    @Args('getStaffInput', { nullable: true }) getStaffInput: GetStaffInput,
  ) {
    return this.getStaffUseCase.execute(getStaffInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { description: 'Get user by id' })
  async getUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.getUserUseCase.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { description: 'Get my user data' })
  async getMe(@CurrentUser('id') id: number) {
    return this.getUserUseCase.execute(id);
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

  @ResolveField('profile', () => UserProfile, { nullable: true })
  getUserProfile(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).profile();
  }

  @ResolveField('workingDays', () => [UserWorkingDay], { nullable: true })
  getUserWorkingDays(@Parent() user: User) {
    return this.prisma.user
      .findUnique({ where: { id: user.id } })
      .workingDays();
  }

  @ResolveField('socials', () => [UserSocial], { nullable: true })
  getUserSocials(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).socials();
  }

  @ResolveField('services', () => [StaffService], { nullable: true })
  getUserServices(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).services();
  }
}
