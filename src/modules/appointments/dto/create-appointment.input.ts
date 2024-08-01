import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Int, { nullable: false })
  staffServiceId!: number;

  @Field(() => Int, { nullable: false })
  staffId!: number;

  @Field(() => Date, { nullable: false })
  targetTime!: Date | string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [GraphQLUpload], { nullable: true })
  images?: Array<Upload['promise']>;
}
