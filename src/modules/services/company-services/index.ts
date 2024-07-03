import { CompanyServicesResolver } from './company-services.resolver';
import { CreateCompanyServiceUseCase } from './use-cases/create-company-service.use-case';
import { GetCompanyServiceUseCase } from './use-cases/get-company-service.use-case';
import { GetCompanyServicesUseCase } from './use-cases/get-company-services.use-case';
import { RemoveCompanyServiceUseCase } from './use-cases/remove-company-service.use-case';
import { UpdateCompanyServiceUseCase } from './use-cases/update-company-service.use-case';

export const CompanyServiceProviders = [
  CompanyServicesResolver,
  CreateCompanyServiceUseCase,
  UpdateCompanyServiceUseCase,
  GetCompanyServiceUseCase,
  GetCompanyServicesUseCase,
  RemoveCompanyServiceUseCase,
];
