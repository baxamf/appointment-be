import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'jwt access token' })
  accessToken: string;

  @Field(() => User, { description: 'user' })
  user: User;
}
