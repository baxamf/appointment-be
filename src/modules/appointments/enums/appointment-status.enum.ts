import { registerEnumType } from '@nestjs/graphql';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
  description: 'Appointment statuses',
});
