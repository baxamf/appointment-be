import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { StaffService } from 'src/modules/services/staff-services/entities/staff-service.entity';
import { UserResponse } from 'src/modules/users/entities/user-response.entity';

@ObjectType()
export class Appointment {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => AppointmentStatus, { nullable: false, defaultValue: 'PENDING' })
  status!: keyof typeof AppointmentStatus;

  @Field(() => Int, { nullable: false })
  staffServiceId!: number;

  @Field(() => Int, { nullable: false })
  customerId!: number;

  @Field(() => Int, { nullable: false })
  staffId!: number;

  @Field(() => Date, { nullable: false })
  targetTime!: Date;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => [String], { nullable: true })
  images!: Array<string>;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => StaffService, { nullable: false })
  staffService?: StaffService;

  @Field(() => UserResponse, { nullable: false })
  customer?: UserResponse;

  @Field(() => UserResponse, { nullable: false })
  staff?: UserResponse;
}
