import { Module } from '@nestjs/common';
import { CompanyServiceProviders } from './company-services';
import { StaffServiceProviders } from './staff-services';
import { ServiceTagProviders } from './service-tags';

@Module({
  providers: [
    ...CompanyServiceProviders,
    ...StaffServiceProviders,
    ...ServiceTagProviders,
  ],
})
export class ServicesModule {}
