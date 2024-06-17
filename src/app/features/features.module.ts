import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';

import { UsersManagementModule } from './users-management/users-management.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { PostsOverviewModule } from './posts-overview/posts-overview.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    UsersManagementModule,
    UserDetailsModule, 
    PostsOverviewModule,
    SharedModule,
  ],
})
export class FeaturesModule {}
