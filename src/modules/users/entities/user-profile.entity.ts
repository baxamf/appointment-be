import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: true })
  lastName!: string | null;

  @Field(() => String, { nullable: false })
  phone!: string;

  @Field(() => String, { nullable: true })
  avatar!: string | null;

  @Field(() => String, { nullable: true })
  bio!: string | null;
}
