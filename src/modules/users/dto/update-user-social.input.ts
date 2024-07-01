import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserSocialInput } from './create-user-social.input';

@InputType()
export class UpdateUserSocialInput extends PartialType(CreateUserSocialInput) {
  @Field(() => Int)
  id: number;
}
