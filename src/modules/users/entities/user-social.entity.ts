import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserSocial {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  link!: string;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  order!: number;

  @Field(() => User, { nullable: false })
  user?: User;
}
