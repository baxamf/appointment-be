import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  USER = 'USER',
}

registerEnumType(UserRole, { name: 'UserRole', description: 'User roles' });
