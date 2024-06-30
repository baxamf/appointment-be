import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';
@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => UserRole, { nullable: false, defaultValue: 'USER' })
  role!: keyof typeof UserRole;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
}
