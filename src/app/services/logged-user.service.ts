import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { Users } from '../models/users.model';
import { selectLoggedUser } from '../state/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  loggedUser!: Users;

  constructor(private store: Store) {}

  getLoggedInUser(): Observable<Users | null> {
    return this.store
      .select(selectLoggedUser)
      .pipe(filter((user) => user !== null && user !== undefined));
  }

  initializePersonalProfile(): Users {
    this.getLoggedInUser().subscribe((user) => {
      if (user) {
        this.loggedUser = user;
      }
    });
    return this.loggedUser;
  }
}
