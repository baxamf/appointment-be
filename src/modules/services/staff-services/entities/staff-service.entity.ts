import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserResponse } from 'src/modules/users/entities/user-response.entity';
import { CompanyService } from '../../company-services/entities/company-service.entity';
import { ServiceTag } from '../../service-tags/entities/service-tag.entity';

@ObjectType()
export class StaffService {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  serviceId!: number;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field(() => Int, { nullable: true })
  price!: number | null;

  @Field(() => Int, { nullable: false })
  duration!: number;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  order!: number;

  @Field(() => UserResponse, { nullable: false })
  user?: UserResponse;

  @Field(() => CompanyService, { nullable: false })
  service?: CompanyService;

  @Field(() => [ServiceTag], { nullable: true })
  tags?: Array<ServiceTag>;
}
