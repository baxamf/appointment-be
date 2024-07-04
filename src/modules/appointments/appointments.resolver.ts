import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getStaffAppointmentsUseCase: GetStaffAppointmentsUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
  ) {}

  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.createAppointmentUseCase.execute(createAppointmentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Appointment], { description: 'Get my appointments' })
  getMyAppointments(@CurrentUser('id') id: number) {
    return this.getStaffAppointmentsUseCase.execute(id);
  }

  @Query(() => [Appointment], { description: 'Get staff appointments' })
  getStaffAppointments(
    @Args('staffUserId', { type: () => Int }) staffUserId: number,
  ) {
    return this.getStaffAppointmentsUseCase.execute(staffUserId);
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
}
