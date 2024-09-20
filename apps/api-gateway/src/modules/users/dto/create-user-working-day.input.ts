import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserWorkingDayInput {
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
