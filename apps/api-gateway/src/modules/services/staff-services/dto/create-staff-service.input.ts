import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class CreateStaffServiceInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  serviceId!: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Upload['promise'];

  @Field(() => Int, {
    nullable: true,
    description: 'Service price per duration',
  })
  price?: number;

  @Field(() => Int, {
    nullable: false,
    description: 'Service duration in minutes',
  })
  duration!: number;

  @Field(() => Int, { nullable: true })
  order?: number;
}
