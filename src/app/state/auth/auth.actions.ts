import { createAction, props } from '@ngrx/store';
import { Users } from '../../models/users.model';

export const login = createAction('[Login Page] User Login',
    props<{email:string; password:string}>()
);
export const loginSuccess = createAction('[Login Api] User Login Success',
  props<{user:Users}>()
);
export const loginFailure = createAction('[Login Api] User Login Failure',
  props<{error:string}>()
);

export const logout = createAction('[Logout] User Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const register = createAction('[Register Page] User Register',
    props<{name:string; gender:string; email:string; password:string}>()
);
export const registerSuccess = createAction('[Register Api] User Register Success',
    props<{user:Users}>()
);
export const registerFailure = createAction('[Register Api] User Register Failure',
    props<{error:string}>()
)