import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCompanyServiceInput } from '../dto/create-company-service.input';

@Injectable()
export class CreateCompanyServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createCompanyServiceInput: CreateCompanyServiceInput) {
    return this.prisma.companyService.create({
      data: createCompanyServiceInput,
    });
  }
}
