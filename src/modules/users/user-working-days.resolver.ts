import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserWorkingDay } from './entities/user-working-day.entity';
import { CreateUserWorkingDayInput } from './dto/create-user-working-day.input';
import { UpdateUserWorkingDayInput } from './dto/update-user-working-day.input ';

@Resolver(() => UserWorkingDay)
export class UserWorkingDaysResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [UserWorkingDay], { description: 'Get staff working days' })
  async getUserWorkingDays(@Args('userId', { nullable: true }) userId: number) {
    return this.prisma.user
      .findUniqueOrThrow({ where: { id: userId } })
      .workingDays();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserWorkingDay)
  createUserWorkingDay(
    @Args('createUserWorkingDayInput')
    createUserWorkingDayInput: CreateUserWorkingDayInput,
  ) {
    return this.prisma.userWorkingDay.create({
      data: createUserWorkingDayInput,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserWorkingDay)
  updateUserWorkingDay(
    @Args('userWorkingDayId', { type: () => Int }) userWorkingDayId: number,
    @Args('updateUserWorkingDayInput')
    updateUserWorkingDayInput: UpdateUserWorkingDayInput,
  ) {
    return this.prisma.userWorkingDay.update({
      where: { id: userWorkingDayId },
      data: updateUserWorkingDayInput,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserWorkingDay)
  removeUserWorkingDay(
    @Args('userWorkingDayId', { type: () => Int }) userWorkingDayId: number,
  ) {
    return this.prisma.userWorkingDay.delete({
      where: { id: userWorkingDayId },
    });
  }
}
