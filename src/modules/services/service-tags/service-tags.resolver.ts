import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateServiceTagInput } from './dto/create-service-tag.input';
import { UpdateServiceTagInput } from './dto/update-service-tag.input';
import { CreateServiceTagUseCase } from './use-cases/create-service-tag.use-case';
import { UpdateServiceTagUseCase } from './use-cases/update-service-tag.use-case';
import { RemoveServiceTagUseCase } from './use-cases/remove-service-tag.use-case';
import { GetServiceTagUseCase } from './use-cases/get-service-tag.use-case';
import { GetServiceTagsUseCase } from './use-cases/get-service-tags.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Public } from 'src/modules/common/decorators/public.decorator';
import { ServiceTag } from './entities/service-tag.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => ServiceTag)
export class ServiceTagsResolver {
  constructor(
    private readonly createServiceTagUseCase: CreateServiceTagUseCase,
    private readonly updateServiceTagUseCase: UpdateServiceTagUseCase,
    private readonly getServiceTagUseCase: GetServiceTagUseCase,
    private readonly getServiceTagsUseCase: GetServiceTagsUseCase,
    private readonly removeServiceTagUseCase: RemoveServiceTagUseCase,
  ) {}

  @Mutation(() => ServiceTag)
  createServiceTag(
    @Args('createServiceTagInput')
    createServiceTagInput: CreateServiceTagInput,
  ) {
    return this.createServiceTagUseCase.execute(createServiceTagInput);
  }

  @Mutation(() => ServiceTag)
  updateServiceTag(
    @Args('updateServiceTagInput') updateServiceTagInput: UpdateServiceTagInput,
  ) {
    return this.updateServiceTagUseCase.execute(updateServiceTagInput);
  }

  @Public()
  @Query(() => [ServiceTag])
  getServiceTags() {
    return this.getServiceTagsUseCase.execute();
  }

  @Public()
  @Query(() => ServiceTag)
  getServiceTag(
    @Args('serviceTagId', { type: () => Int }) serviceTagId: number,
  ) {
    return this.getServiceTagUseCase.execute(serviceTagId);
  }

  @Mutation(() => ServiceTag)
  removeServiceTag(
    @Args('serviceTagId', { type: () => Int }) ServiceTagId: number,
  ) {
    return this.removeServiceTagUseCase.execute(ServiceTagId);
  }
}
