import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class GetStaffInput {
  @Field(() => Int, { nullable: true })
  serviceId?: number;
}
