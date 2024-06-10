import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  register,
  registerSuccess,
  registerFailure,
  logoutSuccess,
} from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TOKEN } from '../../token';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private apiService:ApiService,
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((action) => 
        this.apiService
          .registerUser({
            name: action.name,
            gender: action.gender,
            email: action.email,
            status: 'active',
          })
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((user: any) => {
              
              localStorage.setItem(
                user.email,
                JSON.stringify({ ...user, password: action.password }),
              );
              alert('Registration was successful');
              return registerSuccess({ user });
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catchError((error: any) => of(registerFailure({ error }))),
          ),
      ),
    );
  });

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(login),
        switchMap((action) => {
          const storedUserString = localStorage.getItem(action.email);
          if (storedUserString) {
            const storedUser = JSON.parse(storedUserString);
            if (storedUser && storedUser.password === action.password) {
              localStorage.setItem('token', TOKEN);
              
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const {password, ...userloggedIn} = storedUser
              
              return of(loginSuccess({ user: userloggedIn }));
            } else {
              alert('Invalid credentials');
              return of(loginFailure({ error: 'Invalid credentials' }));
            }
          } else {
            alert('The user does not exist');
            return of(loginFailure({ error: 'The user does not exist' }));
          }
        }),
      );
    },

  );
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }),
        map(() => logoutSuccess()),
      );
    },
    { dispatch: true },
  );
}
