import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetStaffServicesInput {
  @Field(() => Int, { nullable: true })
  serviceId?: number;
}
