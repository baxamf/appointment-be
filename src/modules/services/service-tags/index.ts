import { ServiceTagsResolver } from './service-tags.resolver';
import { CreateServiceTagUseCase } from './use-cases/create-service-tag.use-case';
import { GetCompanyServiceTagsUseCase } from './use-cases/get-company-service-tags.use-case';
import { GetServiceTagsUseCase } from './use-cases/get-service-tags.use-case';
import { RemoveServiceTagUseCase } from './use-cases/remove-service-tag.use-case';
import { UpdateServiceTagUseCase } from './use-cases/update-service-tag.use-case';

export const ServiceTagProviders = [
  ServiceTagsResolver,
  CreateServiceTagUseCase,
  UpdateServiceTagUseCase,
  GetCompanyServiceTagsUseCase,
  GetServiceTagsUseCase,
  RemoveServiceTagUseCase,
];
