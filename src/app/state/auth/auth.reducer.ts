/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  loginFailure,
  loginSuccess,
  logout,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { TOKEN } from '../../token';
import { Users } from '../../models/users.model';


export interface State {
  user: Users | null;
  token: string | null;
  loginSuccessful: boolean;
}
export const initialState = { user: null, token: null, loginSuccessful: false };

export const authReducer = createReducer<State>(
  initialState,
  on(loginSuccess, (state: State, { user }): State => {
    return {
      ...state,
      user,
      token: TOKEN,
      loginSuccessful: true,
    };
  }),
  on(loginFailure, (state: State): State => {
    return {
      ...state,
      token: null,
      loginSuccessful: false,
    };
  }),
  on(logout, (state: State): State => {
    return {
      ...state,
      user: null,
      token: null,
      loginSuccessful: false,
      
    };
  }),
  on(registerSuccess, (state: State, { user }): State => {
    return {
      ...state,
      user,
    };
  }),
  on(registerFailure, (state: State): State => {
    return state;
  }),
);

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token,
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.loginSuccessful,
);

export const selectLoggedInUser = createSelector(
  selectAuthState,
  (auth) => auth.user,
);

