import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { UsersListComponent } from './users-management-components/users-list/users-list.component';
import { AddUserComponent } from './users-management-components/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'usersList',
            component: UsersListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'addUser',
            component: AddUserComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'usersList/:id',
            loadChildren: () =>
              import('../user-details/user-details.module').then(
                (m) => m.UserDetailsModule,
              ),
            canActivate: [AuthGuard],
          },

          { path: '', redirectTo: 'usersList', pathMatch: 'full' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementRoutingModule {}
