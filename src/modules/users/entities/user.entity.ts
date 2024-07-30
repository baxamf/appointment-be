import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';
import { UserProfile } from './user-profile.entity';
import { UserSocial } from './user-social.entity';
import { UserWorkingDay } from './user-working-day.entity';
@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @HideField()
  password!: string;

  @Field(() => UserRole, { nullable: false, defaultValue: 'USER' })
  role!: keyof typeof UserRole;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => UserProfile, { nullable: true })
  profile?: UserProfile | null;

  @Field(() => [UserWorkingDay], { nullable: true })
  workingDays?: Array<UserWorkingDay>;

  @Field(() => [UserSocial], { nullable: true })
  socials?: Array<UserSocial>;
}
