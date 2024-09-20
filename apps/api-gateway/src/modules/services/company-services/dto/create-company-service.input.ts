import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class CreateCompanyServiceInput {
  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => GraphQLUpload, { nullable: false })
  image!: Upload['promise'];

  @Field(() => Int, { nullable: true })
  order?: number;
}
