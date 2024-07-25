import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetAppointmentFilterInput {
  @Field(() => Int, { nullable: true })
  staffServiceId?: number;

  @Field(() => Int, { nullable: true })
  staffId?: number;

  @Field(() => Date, { nullable: true })
  targetTime?: Date | string;
}
