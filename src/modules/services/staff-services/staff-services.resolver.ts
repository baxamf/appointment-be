import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateStaffServiceInput } from './dto/create-staff-service.input';
import { UpdateStaffServiceInput } from './dto/update-staff-service.input';
import { CreateStaffServiceUseCase } from './use-cases/create-staff-service.use-case';
import { UpdateStaffServiceUseCase } from './use-cases/update-staff-service.use-case';
import { RemoveStaffServiceUseCase } from './use-cases/remove-staff-service.use-case';
import { GetStaffServiceUseCase } from './use-cases/get-staff-service.use-case';
import { GetStaffServicesUseCase } from './use-cases/get-staff-services.use-case';
import { StaffService } from './entities/staff-service.entity';
import { CurrentUser } from 'src/modules/common/decorators/get-current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { GetStaffServicesByUserIdUseCase } from './use-cases/get-staff-services-by-user-id.use-case';
import { CompanyService } from '../company-services/entities/company-service.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserResponse } from 'src/modules/users/entities/user-response.entity';
import { GetStaffServicesInput } from './dto/get-staff-services-input';
import { Public } from 'src/modules/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Resolver(() => StaffService)
export class StaffServicesResolver {
  constructor(
    private readonly createStaffServiceUseCase: CreateStaffServiceUseCase,
    private readonly updateStaffServiceUseCase: UpdateStaffServiceUseCase,
    private readonly getStaffServiceUseCase: GetStaffServiceUseCase,
    private readonly getStaffServicesUseCase: GetStaffServicesUseCase,
    private readonly getStaffServicesByUserIdUseCase: GetStaffServicesByUserIdUseCase,
    private readonly removeStaffServiceUseCase: RemoveStaffServiceUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => StaffService)
  createStaffService(
    @CurrentUser('id') id: number,
    @Args('createStaffServiceInput')
    createStaffServiceInput: CreateStaffServiceInput,
  ) {
    return this.createStaffServiceUseCase.execute(id, createStaffServiceInput);
  }

  @Mutation(() => StaffService)
  updateStaffService(
    @Args('staffServiceId', { type: () => Int }) staffServiceId: number,
    @Args('updateStaffServiceInput')
    updateServiceInput: UpdateStaffServiceInput,
  ) {
    return this.updateStaffServiceUseCase.execute(
      staffServiceId,
      updateServiceInput,
    );
  }

  @Public()
  @Query(() => [StaffService])
  getStaffServices(
    @Args('getStaffServicesInput', { nullable: true })
    getStaffServicesInput: GetStaffServicesInput,
  ) {
    return this.getStaffServicesUseCase.execute(getStaffServicesInput);
  }

  @Query(() => [StaffService])
  getMyStaffServices(@CurrentUser('id') id: number) {
    return this.getStaffServicesByUserIdUseCase.execute(id);
  }

  @Query(() => StaffService)
  getStaffService(
    @Args('staffServiceId', { type: () => Int }) staffServiceId: number,
  ) {
    return this.getStaffServiceUseCase.execute(staffServiceId);
  }

  @Mutation(() => StaffService)
  removeStaffService(
    @Args('staffServiceId', { type: () => Int }) staffServiceId: number,
  ) {
    return this.removeStaffServiceUseCase.execute(staffServiceId);
  }

  @ResolveField('user', () => UserResponse)
  getStaffServiceUser(@Parent() { id }: StaffService) {
    return this.prisma.staffService.findUniqueOrThrow({ where: { id } }).user();
  }

  @ResolveField('service', () => CompanyService)
  getStaffServiceCompanyService(@Parent() { id }: StaffService) {
    return this.prisma.staffService
      .findUniqueOrThrow({ where: { id } })
      .service();
  }
}
