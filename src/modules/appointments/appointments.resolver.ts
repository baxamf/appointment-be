import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { CreateAppointmentUseCase } from './use-cases/create-appointment.use-case';
import { GetStaffAppointmentsUseCase } from './use-cases/get-staff-appointments.use-case';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CancelAppointmentUseCase } from './use-cases/cancel-appointment.use-case';
import { UpdateAppointmentUseCase } from './use-cases/update-appointment.use-case';
import { CustomerDataInput } from './dto/customer-data.input';
import { PrismaService } from '../prisma/prisma.service';
import { StaffService } from '../services/staff-services/entities/staff-service.entity';
import { UserResponse } from '../users/entities/user-response.entity';
import { GetAppointmentFilterInput } from './dto/get-appointment-filter.input';
import { GetAllAppointmentsUseCase } from './use-cases/get-all-appointments.use-case';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getStaffAppointmentsUseCase: GetStaffAppointmentsUseCase,
    private readonly getAllAppointmentsUseCase: GetAllAppointmentsUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
    @Args('customerDataInput')
    customerDataInput: CustomerDataInput,
  ) {
    return this.createAppointmentUseCase.execute(
      createAppointmentInput,
      customerDataInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Appointment], { description: 'Get my appointments' })
  getMyAppointments(
    @CurrentUser('id') id: number,
    @Args('getAppointmentFilterInput', { nullable: true })
    getAppointmentFilterInput: GetAppointmentFilterInput,
  ) {
    return this.getStaffAppointmentsUseCase.execute(
      id,
      getAppointmentFilterInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Appointment], {
    description: 'Get all appointments by filter params',
  })
  getAllAppointments(
    @Args('getAppointmentFilterInput', { nullable: true })
    getAppointmentFilterInput: GetAppointmentFilterInput,
  ) {
    return this.getAllAppointmentsUseCase.execute(getAppointmentFilterInput);
  }

  @Mutation(() => Appointment)
  cancelAppointment(
    @Args('appointmentId', { type: () => Int }) appointmentId: number,
  ) {
    return this.cancelAppointmentUseCase.execute(appointmentId);
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ) {
    return this.updateAppointmentUseCase.execute(updateAppointmentInput);
  }

  @ResolveField('staffService', () => StaffService)
  getAppointmentStaffService(@Parent() { id }: Appointment) {
    return this.prisma.appointment
      .findUniqueOrThrow({ where: { id } })
      .staffService();
  }

  @ResolveField('customer', () => UserResponse)
  getAppointmentCustomer(@Parent() { id }: Appointment) {
    return this.prisma.appointment
      .findUniqueOrThrow({ where: { id } })
      .customer();
  }

  @ResolveField('staff', () => UserResponse)
  getAppointmentStaff(@Parent() { id }: Appointment) {
    return this.prisma.appointment.findUniqueOrThrow({ where: { id } }).staff();
  }
}
