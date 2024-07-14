import { CreateServiceTagInput } from './create-service-tag.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceTagInput extends PartialType(CreateServiceTagInput) {}
