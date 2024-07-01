import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { CreateUserProfileUseCase } from './use-cases/create-user-profile.use-case';
import { CreateUserSocialUseCase } from './use-cases/create-user-social.use-case';
import { RemoveUserSocialUseCase } from './use-cases/remove-user-social.use-case';
import { UpdateUserSocialUseCase } from './use-cases/update-user-social.use-case';
import { UpdateUserProfileUseCase } from './use-cases/update-user-profile.use-case';

@Module({
  providers: [
    UsersResolver,
    CreateUserUseCase,
    GetUserUseCase,
    CreateUserProfileUseCase,
    UpdateUserProfileUseCase,
    CreateUserSocialUseCase,
    UpdateUserSocialUseCase,
    RemoveUserSocialUseCase,
  ],
})
export class UsersModule {}
