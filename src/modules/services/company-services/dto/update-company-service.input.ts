import { CreateCompanyServiceInput } from './create-company-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyServiceInput extends PartialType(
  CreateCompanyServiceInput,
) {
  @Field(() => Int)
  id: number;
}
