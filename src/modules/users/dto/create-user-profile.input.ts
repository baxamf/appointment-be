import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserProfileInput {
  @IsString()
  @Length(2)
  @Field(() => String, { nullable: false })
  firstName!: string;

  @IsOptional()
  @IsString()
  @Length(2)
  @Field(() => String, { nullable: true })
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(2)
  @Field(() => String, { nullable: true })
  nickName?: string;

  @IsOptional()
  @IsString()
  @Length(2)
  @Field(() => String, { nullable: true })
  specialization?: string;

  // @IsPhoneNumber()
  @Field(() => String, { nullable: false })
  phone!: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  bio?: string;
}
