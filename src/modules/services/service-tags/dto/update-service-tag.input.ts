import { CreateServiceTagInput } from './create-service-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceTagInput extends PartialType(CreateServiceTagInput) {
  @Field(() => Int)
  id: number;
}
