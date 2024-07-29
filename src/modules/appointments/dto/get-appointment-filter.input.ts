import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetAppointmentFilterInput {
  @Field(() => Int, { nullable: true })
  companyServiceId?: number;

  @Field(() => Int, { nullable: true })
  staffServiceId?: number;

  @Field(() => Int, { nullable: true })
  staffId?: number;

  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  targetTime?: Date | string;
}
