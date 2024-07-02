import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSocial {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  link!: string;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  order!: number;
}
