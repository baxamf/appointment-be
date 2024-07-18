import { InputType, Int, Field } from '@nestjs/graphql';

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

  @Field(() => String, { nullable: true })
  image?: string;

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
