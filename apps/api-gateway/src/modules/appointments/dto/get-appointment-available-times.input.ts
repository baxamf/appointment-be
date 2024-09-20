import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetAppointmentAvailableTimesInput {
  @Field(() => Int)
  staffServiceId!: number;

  @Field(() => Int)
  staffId!: number;

  @Field(() => Date)
  targetTime!: Date | string;
}
