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
import { GetAppointmentFilterInput } from './dto/get-appointment-filter.input';
import { GetAllAppointmentsUseCase } from './use-cases/get-all-appointments.use-case';
import { User } from '../users/entities/user.entity';
import { GetAppointmentAvailableTimesUseCase } from './use-cases/get-appointment-available-times.use-case';
import { GetAppointmentAvailableTimesInput } from './dto/get-appointment-available-times.input';
import { GetAppointmentAvailableTimesOutput } from './dto/get-appointment-available-times.output';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getStaffAppointmentsUseCase: GetStaffAppointmentsUseCase,
    private readonly getAllAppointmentsUseCase: GetAllAppointmentsUseCase,
    private readonly getAppointmentAvailableTimesUseCase: GetAppointmentAvailableTimesUseCase,
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

  @Query(() => [GetAppointmentAvailableTimesOutput], {
    description: 'Get available target times for appointment',
  })
  getAppointmentAvailableTimes(
    @Args('getAppointmentAvailableTimesInput')
    getAppointmentAvailableTimesInput: GetAppointmentAvailableTimesInput,
  ) {
    return this.getAppointmentAvailableTimesUseCase.execute(
      getAppointmentAvailableTimesInput,
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

  @ResolveField('customer', () => User)
  getAppointmentCustomer(@Parent() { id }: Appointment) {
    return this.prisma.appointment
      .findUniqueOrThrow({ where: { id } })
      .customer();
  }

  @ResolveField('staff', () => User)
  getAppointmentStaff(@Parent() { id }: Appointment) {
    return this.prisma.appointment.findUniqueOrThrow({ where: { id } }).staff();
  }
}
