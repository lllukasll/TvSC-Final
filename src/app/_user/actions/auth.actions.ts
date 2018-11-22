import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  GET_USER_BY_COOKIE = '[Auth] Get User By Cookie',
  GET_USER_BY_COOKIE_SUCCESS = '[Auth] Get User By Cookie Success',
  GET_USER_BY_COOKIE_FAILURE = '[Auth] Get User By Cookie Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class GetUserByCookie implements Action {
  readonly type = AuthActionTypes.GET_USER_BY_COOKIE;
  constructor() { }
}

export class GetUserByCookieSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_BY_COOKIE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetUserByCookieFailure implements Action {
  readonly type = AuthActionTypes.GET_USER_BY_COOKIE_FAILURE;
  constructor(public payload: any) { }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | LogInSuccess
  | LogoutFailure
  | GetUserByCookie
  | GetUserByCookieSuccess
  | GetUserByCookieFailure;
