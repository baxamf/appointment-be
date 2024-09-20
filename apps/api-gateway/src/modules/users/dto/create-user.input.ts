import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String, { nullable: false })
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  @Field(() => UserRole, { nullable: true })
  role?: keyof typeof UserRole;
}
