import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateServiceTagInput } from './dto/create-service-tag.input';
import { UpdateServiceTagInput } from './dto/update-service-tag.input';
import { CreateServiceTagUseCase } from './use-cases/create-service-tag.use-case';
import { UpdateServiceTagUseCase } from './use-cases/update-service-tag.use-case';
import { RemoveServiceTagUseCase } from './use-cases/remove-service-tag.use-case';
import { GetCompanyServiceTagsUseCase } from './use-cases/get-company-service-tags.use-case';
import { GetServiceTagsUseCase } from './use-cases/get-service-tags.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@api/modules/auth/guards/jwt-auth.guard';
import { Public } from '@api/modules/common/decorators/public.decorator';
import { ServiceTag } from './entities/service-tag.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => ServiceTag)
export class ServiceTagsResolver {
  constructor(
    private readonly createServiceTagUseCase: CreateServiceTagUseCase,
    private readonly updateServiceTagUseCase: UpdateServiceTagUseCase,
    private readonly getCompanyServiceTagsUseCase: GetCompanyServiceTagsUseCase,
    private readonly getServiceTagsUseCase: GetServiceTagsUseCase,
    private readonly removeServiceTagUseCase: RemoveServiceTagUseCase,
  ) {}

  @Mutation(() => ServiceTag)
  createServiceTag(
    @Args('companyServiceId', { type: () => Int, nullable: true })
    companyServiceId: number,
    @Args('createServiceTagInput')
    createServiceTagInput: CreateServiceTagInput,
  ) {
    return this.createServiceTagUseCase.execute(
      companyServiceId,
      createServiceTagInput,
    );
  }

  @Mutation(() => ServiceTag)
  updateServiceTag(
    @Args('serviceTagId', { type: () => Int }) serviceTagId: number,
    @Args('updateServiceTagInput') updateServiceTagInput: UpdateServiceTagInput,
  ) {
    return this.updateServiceTagUseCase.execute(
      serviceTagId,
      updateServiceTagInput,
    );
  }

  @Public()
  @Query(() => [ServiceTag])
  getServiceTags() {
    return this.getServiceTagsUseCase.execute();
  }

  @Public()
  @Query(() => [ServiceTag])
  getCompanyServiceTags(
    @Args('companyServiceId', { type: () => Int }) companyServiceId: number,
  ) {
    return this.getCompanyServiceTagsUseCase.execute(companyServiceId);
  }

  @Mutation(() => ServiceTag)
  removeServiceTag(
    @Args('serviceTagId', { type: () => Int }) serviceTagId: number,
  ) {
    return this.removeServiceTagUseCase.execute(serviceTagId);
  }
}
