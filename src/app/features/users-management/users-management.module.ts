import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersManagementComponent } from './users-management.component';
import { UsersListComponent } from './users-management-components/users-list/users-list.component';
import { UsersViewComponent } from './users-management-components/users-view/users-view.component';
import { AddUserComponent } from './users-management-components/add-user/add-user.component';
import { UsersManagementRoutingModule } from './users-management-routing.module';

@NgModule({
  declarations: [UsersManagementComponent, UsersListComponent, UsersViewComponent, AddUserComponent],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule  
  ],
  exports: [UsersManagementComponent, UsersListComponent, UsersViewComponent, AddUserComponent]
})
export class UsersManagementModule { }
