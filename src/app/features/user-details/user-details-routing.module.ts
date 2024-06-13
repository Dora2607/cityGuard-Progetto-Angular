import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import path from 'path';
import { UserProfileComponent } from './user-details-components/user-profile/user-profile.component';
import { UserPostsComponent } from './user-details-components/user-posts/user-posts.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
