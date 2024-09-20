import { CreateStaffServiceInput } from './create-staff-service.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStaffServiceInput extends PartialType(
  CreateStaffServiceInput,
) {}
