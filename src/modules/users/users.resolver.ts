import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { Request } from 'express';
import { CachingService } from '../caching/caching.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtRefreshGuard } from '../auth/guards/jwt-refresh.guard';

@UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtRefreshGuard)
  @Query(() => User, { description: 'Get user by id' })
  async getUser(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: Request,
    @CurrentUser() user: unknown,
  ) {
    console.log(user);
    // req.res?.cookie('test', '123123', {
    //   maxAge: 3000,
    //   httpOnly: true,
    //   sameSite: true,
    // });
    // await this.cache.setToken('test', 'token123123123', 60);
    // const token = await this.cache.getToken('test');
    // console.log(token);
    // // req.res?.clearCookie('test');
    // console.log(req.cookies);
    return this.getUserUseCase.execute(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return;
  // }
}
