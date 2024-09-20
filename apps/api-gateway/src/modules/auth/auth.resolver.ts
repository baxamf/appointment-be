import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from './guards/login.guard';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthenticateUserUseCase } from './use-cases/authenticate-user.use-case';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { MessageResponse } from '../common/entities/message-response.entity';
import { LogoutUserUseCase } from './use-cases/logout-user.use-case';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
  ) {}

  @UseGuards(LoginGuard)
  @Mutation(() => Auth, { description: 'Login user' })
  login(@Args('loginInput') loginInput: LoginInput, @CurrentUser() user: User) {
    return this.authenticateUserUseCase.execute(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Query(() => Auth, { description: 'Refresh access token' })
  refresh(@CurrentUser() user: User) {
    return this.authenticateUserUseCase.execute(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Query(() => MessageResponse, { description: 'Logout user' })
  logout(@CurrentUser() user: User) {
    return this.logoutUserUseCase.execute(user);
  }
}
