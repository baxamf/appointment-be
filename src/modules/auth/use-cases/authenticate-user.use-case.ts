import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(user: User) {
    const tokens = await this.authService.generateTokens(user);

    return { ...tokens, user };
  }
}
