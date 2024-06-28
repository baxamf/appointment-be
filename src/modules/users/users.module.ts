import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';

@Module({
  providers: [UsersResolver, CreateUserUseCase, GetUserUseCase],
})
export class UsersModule {}
