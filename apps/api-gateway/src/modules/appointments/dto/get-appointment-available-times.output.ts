import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetAppointmentAvailableTimesOutput {
  @Field(() => Date, { nullable: false })
  targetTime!: Date;
}
