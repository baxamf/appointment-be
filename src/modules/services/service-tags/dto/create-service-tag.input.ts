import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceTagInput {
  @Field(() => String, { nullable: false })
  title!: string;
}
