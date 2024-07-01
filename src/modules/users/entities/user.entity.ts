import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';
import { UserProfile } from './user-profile.entity';
import { UserSocial } from './user-social.entity';
@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => UserRole, { nullable: false, defaultValue: 'USER' })
  role!: keyof typeof UserRole;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => UserProfile, { nullable: true })
  profile?: UserProfile | null;

  @Field(() => [UserSocial], { nullable: true })
  socials?: Array<UserSocial>;
}
