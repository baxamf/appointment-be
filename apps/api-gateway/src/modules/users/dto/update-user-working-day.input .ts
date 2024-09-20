import { InputType, OmitType } from '@nestjs/graphql';
import { CreateUserWorkingDayInput } from './create-user-working-day.input';

@InputType()
export class UpdateUserWorkingDayInput extends OmitType(
  CreateUserWorkingDayInput,
  ['userId'],
) {}
