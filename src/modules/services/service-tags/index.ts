import { ServiceTagsResolver } from './service-tags.resolver';
import { CreateServiceTagUseCase } from './use-cases/create-service-tag.use-case';
import { GetServiceTagUseCase } from './use-cases/get-service-tag.use-case';
import { GetServiceTagsUseCase } from './use-cases/get-service-tags.use-case';
import { RemoveServiceTagUseCase } from './use-cases/remove-service-tag.use-case';
import { UpdateServiceTagUseCase } from './use-cases/update-service-tag.use-case';

export const ServiceTagProviders = [
  ServiceTagsResolver,
  CreateServiceTagUseCase,
  UpdateServiceTagUseCase,
  GetServiceTagUseCase,
  GetServiceTagsUseCase,
  RemoveServiceTagUseCase,
];
