import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./authentication/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [AuthGuard],
    data: {preload: true}
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: SelectivePreloadingStrategyService }
  )],
  exports: [RouterModule],
}) 
export class AppRoutingModule {}
