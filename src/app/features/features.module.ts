import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    UsersManagementModule,
    UserDetailsModule, 
    SharedModule,
  ],
})
export class FeaturesModule {}
