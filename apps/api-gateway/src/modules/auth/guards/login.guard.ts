import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginInput } from '../dto/login.input';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { loginInput } = ctx.getArgs<{ loginInput: LoginInput }>();
    const user = await this.authService.authenticate(loginInput);

    ctx.getContext().req.user = user;

    return true;
  }
}
