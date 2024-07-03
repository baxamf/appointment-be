import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCompanyServiceInput } from '../dto/update-company-service.input';

@Injectable()
export class UpdateCompanyServiceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(updateCompanyServiceInput: UpdateCompanyServiceInput) {
    const { id, ...companyServiceData } = updateCompanyServiceInput;

    return this.prisma.companyService.update({
      where: { id },
      data: companyServiceData,
    });
  }
}
