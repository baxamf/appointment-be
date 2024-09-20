import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StaffService } from '../../staff-services/entities/staff-service.entity';
import { ServiceTag } from '../../service-tags/entities/service-tag.entity';

@ObjectType()
export class CompanyService {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => String, { nullable: false })
  image!: string;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  order!: number;

  @Field(() => [StaffService], { nullable: true })
  staffServices?: Array<StaffService>;

  @Field(() => [ServiceTag], { nullable: true })
  tags?: Array<ServiceTag>;
}
