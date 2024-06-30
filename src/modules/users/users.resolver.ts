import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { CachingService } from '../caching/caching.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from './entities/user-response.entity';

@Resolver(() => UserResponse)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly cache: CachingService,
  ) {}

  @Mutation(() => UserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.createUserUseCase.execute(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResponse, { description: 'Get user by id' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.getUserUseCase.execute(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return;
  // }
}
