import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Int, { nullable: false })
  staffServiceId!: number;

  @Field(() => Int, { nullable: false })
  customerId!: number;

  @Field(() => Int, { nullable: false })
  staffId!: number;

  @Field(() => Date, { nullable: false })
  targetTime!: Date | string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  images?: Array<string>;
}
