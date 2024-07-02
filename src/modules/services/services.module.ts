import { Module } from '@nestjs/common';
import { CompanyServicesResolver } from './company-services.resolver';

@Module({
  providers: [CompanyServicesResolver],
})
export class ServicesModule {}
