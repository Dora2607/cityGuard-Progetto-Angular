import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectToken } from '../../state/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate: CanActivateFn;
  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.canActivate = () => {
      return this.store.select(selectToken).pipe(
        map((token) => {
          const isAuthenticated = !!token;
          if (!isAuthenticated) {
            this.router.navigate(['login']);
          }
          return isAuthenticated;
        }),
      );
    };
  }
}
