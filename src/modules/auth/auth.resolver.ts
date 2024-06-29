import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Mutation(() => Auth)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @CurrentUser() user: User,
  ) {
    const tokens = await this.authService.generateTokens(user);

    return { ...tokens, user };
  }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
