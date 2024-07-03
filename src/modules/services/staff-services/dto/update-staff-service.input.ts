import { CreateStaffServiceInput } from './create-staff-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStaffServiceInput extends PartialType(
  CreateStaffServiceInput,
) {
  @Field(() => Int)
  id: number;
}
