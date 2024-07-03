import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

@UseGuards(JwtAuthGuard)
@Resolver(() => StaffService)
export class StaffServicesResolver {
  constructor(
    private readonly createStaffServiceUseCase: CreateStaffServiceUseCase,
    private readonly updateStaffServiceUseCase: UpdateStaffServiceUseCase,
    private readonly getStaffServiceUseCase: GetStaffServiceUseCase,
    private readonly getStaffServicesUseCase: GetStaffServicesUseCase,
    private readonly removeStaffServiceUseCase: RemoveStaffServiceUseCase,
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
    @Args('updateServiceInput') updateServiceInput: UpdateStaffServiceInput,
  ) {
    return this.updateStaffServiceUseCase.execute(updateServiceInput);
  }

  @Query(() => [StaffService])
  getStaffServices() {
    return this.getStaffServicesUseCase.execute();
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
}
