import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CustomerDataInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  email!: string;

  @IsString()
  @Length(2)
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  phone!: string;
}
