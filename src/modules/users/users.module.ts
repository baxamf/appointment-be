import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { CreateUserSocialUseCase } from './use-cases/create-user-social.use-case';
import { UpdateUserSocialUseCase } from './use-cases/update-user-social.use-case';
import { UpdateUserProfileUseCase } from './use-cases/update-user-profile.use-case';
import { GetStaffUseCase } from './use-cases/get-staff.use-case';
import { UserSocialsResolver } from './user-socials.resolver';
import { UserWorkingDaysResolver } from './user-working-days.resolver';

@Module({
  providers: [
    UsersResolver,
    UserSocialsResolver,
    UserWorkingDaysResolver,
    CreateUserUseCase,
    GetUserUseCase,
    GetStaffUseCase,
    UpdateUserProfileUseCase,
    CreateUserSocialUseCase,
    UpdateUserSocialUseCase,
  ],
})
export class UsersModule {}
