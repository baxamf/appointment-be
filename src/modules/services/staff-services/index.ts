import { StaffServicesResolver } from './staff-services.resolver';
import { CreateStaffServiceUseCase } from './use-cases/create-staff-service.use-case';
import { GetStaffServiceUseCase } from './use-cases/get-staff-service.use-case';
import { GetStaffServicesUseCase } from './use-cases/get-staff-services.use-case';
import { RemoveStaffServiceUseCase } from './use-cases/remove-staff-service.use-case';
import { UpdateStaffServiceUseCase } from './use-cases/update-staff-service.use-case';

export const StaffServiceProviders = [
  StaffServicesResolver,
  CreateStaffServiceUseCase,
  UpdateStaffServiceUseCase,
  GetStaffServiceUseCase,
  GetStaffServicesUseCase,
  RemoveStaffServiceUseCase,
];
