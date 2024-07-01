import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, Length } from 'class-validator';

@InputType()
export class CreateUserProfileInput {
  @Length(2)
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Length(2)
  @Field(() => String, { nullable: true })
  lastName?: string;

  @IsPhoneNumber()
  @Field(() => String, { nullable: false })
  phone!: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
