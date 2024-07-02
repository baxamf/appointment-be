import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserProfileInput {
  @IsString()
  @Length(2)
  @Field(() => String, { nullable: false })
  firstName!: string;

  @IsString()
  @Length(2)
  @Field(() => String, { nullable: true })
  lastName?: string;

  @IsPhoneNumber()
  @Field(() => String, { nullable: false })
  phone!: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  bio?: string;
}
