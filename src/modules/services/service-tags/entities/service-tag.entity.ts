import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ServiceTag {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  title!: string;
}
