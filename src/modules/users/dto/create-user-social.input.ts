import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class CreateUserSocialInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @IsUrl()
  @Field(() => String, { nullable: false })
  link!: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}
