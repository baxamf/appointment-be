import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserWorkingDay {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  day!: number;

  @Field(() => Int, { nullable: false })
  startHour!: number;

  @Field(() => Int, { nullable: false })
  startMinute!: number;

  @Field(() => Int, { nullable: false })
  endHour!: number;

  @Field(() => Int, { nullable: false })
  endMinute!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;
}
