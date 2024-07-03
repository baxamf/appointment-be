import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyServiceInput {
  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => String, { nullable: false })
  image!: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
