import { CreateCompanyServiceInput } from './create-company-service.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyServiceInput extends PartialType(
  CreateCompanyServiceInput,
) {}
