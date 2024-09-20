import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'user email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String, { description: 'user password' })
  password: string;
}
