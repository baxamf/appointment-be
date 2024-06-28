import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { CachingService } from '../caching/caching.service';
import { CacheTTL } from '@nestjs/cache-manager';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly cache: CachingService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.createUserUseCase.execute(createUserInput);
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return;
  // }

  @CacheTTL(5000)
  @Query(() => User, { description: 'Get user by id' })
  async getUser(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: Request,
  ) {
    return this.getUserUseCase.execute(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return;
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return;
  // }
}
