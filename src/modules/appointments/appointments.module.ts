import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { CreateAppointmentUseCase } from './use-cases/create-appointment.use-case';
import { GetStaffAppointmentsUseCase } from './use-cases/get-staff-appointments.use-case';
import { CancelAppointmentUseCase } from './use-cases/cancel-appointment.use-case';
import { UpdateAppointmentUseCase } from './use-cases/update-appointment.use-case';
import { GetAllAppointmentsUseCase } from './use-cases/get-all-appointments.use-case';

@Module({
  providers: [
    AppointmentsResolver,
    CreateAppointmentUseCase,
    GetStaffAppointmentsUseCase,
    GetAllAppointmentsUseCase,
    CancelAppointmentUseCase,
    UpdateAppointmentUseCase,
  ],
})
export class AppointmentsModule {}
