import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsOverviewComponent } from './posts-overview.component';
import { AuthGuard } from '../../authentication/guard/auth.guard';

const routes: Routes = [
  { path:'',
    component: PostsOverviewComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsOverviewRoutingModule { }
