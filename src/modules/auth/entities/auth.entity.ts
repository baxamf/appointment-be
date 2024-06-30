import { ObjectType, Field } from '@nestjs/graphql';
import { UserResponse } from 'src/modules/users/entities/user-response.entity';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'jwt access token' })
  accessToken: string;

  @Field(() => UserResponse, { description: 'user' })
  user: UserResponse;
}
