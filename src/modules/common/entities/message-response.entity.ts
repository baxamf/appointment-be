import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => String, { description: 'Response message' })
  message: string;
}
