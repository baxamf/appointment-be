import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CompanyService } from './entities/company-service.entity';
import { CreateCompanyServiceInput } from './dto/create-company-service.input';
import { UpdateCompanyServiceInput } from './dto/update-company-service.input';
import { CreateCompanyServiceUseCase } from './use-cases/create-company-service.use-case';
import { UpdateCompanyServiceUseCase } from './use-cases/update-company-service.use-case';
import { RemoveCompanyServiceUseCase } from './use-cases/remove-company-service.use-case';
import { GetCompanyServiceUseCase } from './use-cases/get-company-service.use-case';
import { GetCompanyServicesUseCase } from './use-cases/get-company-services.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Public } from 'src/modules/common/decorators/public.decorator';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => CompanyService)
export class CompanyServicesResolver {
  constructor(
    private readonly createCompanyServiceUseCase: CreateCompanyServiceUseCase,
    private readonly updateCompanyServiceUseCase: UpdateCompanyServiceUseCase,
    private readonly getCompanyServiceUseCase: GetCompanyServiceUseCase,
    private readonly getCompanyServicesUseCase: GetCompanyServicesUseCase,
    private readonly removeCompanyServiceUseCase: RemoveCompanyServiceUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => CompanyService)
  createCompanyService(
    @Args('createCompanyServiceInput')
    createCompanyServiceInput: CreateCompanyServiceInput,
  ) {
    return this.createCompanyServiceUseCase.execute(createCompanyServiceInput);
  }

  @Mutation(() => CompanyService)
  updateCompanyService(
    @Args('companyServiceId', { type: () => Int }) companyServiceId: number,
    @Args('updateCompanyServiceInput')
    updateCompanyServiceInput: UpdateCompanyServiceInput,
  ) {
    return this.updateCompanyServiceUseCase.execute(
      companyServiceId,
      updateCompanyServiceInput,
    );
  }

  @Public()
  @Query(() => [CompanyService])
  getCompanyServices() {
    return this.getCompanyServicesUseCase.execute();
  }

  @Public()
  @Query(() => CompanyService)
  getCompanyService(
    @Args('companyServiceId', { type: () => Int }) companyServiceId: number,
  ) {
    return this.getCompanyServiceUseCase.execute(companyServiceId);
  }

  @Mutation(() => CompanyService)
  removeCompanyService(
    @Args('companyServiceId', { type: () => Int }) companyServiceId: number,
  ) {
    return this.removeCompanyServiceUseCase.execute(companyServiceId);
  }

  @ResolveField('tags', () => [ServiceTag], { nullable: true })
  getUserProfile(@Parent() service: CompanyService) {
    return this.prisma.companyService
      .findUnique({ where: { id: service.id } })
      .tags();
  }
}
