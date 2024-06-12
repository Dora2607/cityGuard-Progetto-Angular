import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/guard/auth.guard';


const routes: Routes = [
  {
    path: 'usersManagement',
    loadChildren: () =>
      import('./users-management/users-management.module').then((m) => m.UsersManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'usersManagement/:id',
    loadChildren: () =>
      import('./user-details/user-details.module').then((m) => m.UserDetailsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
