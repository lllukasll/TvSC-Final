import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  Logout,
  LogoutSuccess,
  LogoutFailure,
  GetUserByCookie,
  GetUserByCookieSuccess,
  GetUserByCookieFailure } from '../actions/auth.actions';
import {
    CloseModal
  } from '../../_shared/actions/modal';
import {
  NotificationAdded
} from '../../_shared/actions/notification';
import { Router } from '@angular/router';
import { ErrorModel } from '../../models/errorModel';
import { DataService } from '../../services/data.service';
import { HideSpinner, ShowSpinner } from '../../_shared/actions/spinner';

type showSpinnerTypes =
  | LogIn
  | SignUp
  | GetUserByCookie
  | Logout;

const showSpinnerActions = [
  AuthActionTypes.LOGIN,
  AuthActionTypes.SIGNUP,
  AuthActionTypes.GET_USER_BY_COOKIE_FAILURE,
  AuthActionTypes.LOGOUT
];

type hideSpinnerTypes =
  | LogInSuccess
  | LogInFailure
  | SignUpSuccess
  | SignUpFailure
  | GetUserByCookieSuccess
  | GetUserByCookieFailure
  | LogoutSuccess
  | LogoutFailure;

const hideSpinnerActions = [
  AuthActionTypes.LOGIN_SUCCESS,
  AuthActionTypes.LOGIN_FAILURE,
  AuthActionTypes.SIGNUP_SUCCESS,
  AuthActionTypes.SIGNUP_FAILURE,
  AuthActionTypes.GET_USER_BY_COOKIE_SUCCESS,
  AuthActionTypes.GET_USER_BY_COOKIE_FAILURE,
  AuthActionTypes.LOGOUT_SUCCESS,
  AuthActionTypes.LOGOUT_FAILURE
];

@Injectable()
export class AuthEffects  {
  constructor(private actions: Actions, private dataService: DataService , private authService: AuthService, private router: Router) { }

  @Effect()
  showSpinner: Observable<Action> = this.actions
    .ofType<showSpinnerTypes>(...showSpinnerActions)
    .pipe(map(() => new ShowSpinner()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions
    .ofType<hideSpinnerTypes>(...hideSpinnerActions)
    .pipe(map(() => new HideSpinner()));

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          return new LogInSuccess(this.dataService.getDto(user));
        }),
        catchError((error => {
          return of(new LogInFailure({error: this.dataService.getErrors(error)}));
        }))
      );
    })
  );

  @Effect()
  LogInSuccess: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .pipe(
      switchMap(() => [
        new NotificationAdded('Pomyślnie zalogowano'),
        new CloseModal()
      ])
    );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  GetUserByCookie: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_BY_COOKIE),
    switchMap(() => {
      return this.authService.getUserByCookie().pipe(
        map((user) => {
          return new GetUserByCookieSuccess(this.dataService.getDto(user));
        }),
        catchError((error => {
          return of(new GetUserByCookieFailure(this.dataService.getErrors(error)));
        }))
      );
    })
  );

  @Effect({ dispatch: false })
  GetUserByCookieSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_BY_COOKIE_SUCCESS)
  );

  @Effect({ dispatch: false })
  GetUserByCookieFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_BY_COOKIE_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.userName, payload.firstName, payload.lastName,
                                     payload.email, payload.password, payload.confirmPassword).pipe(
        map(() =>  new SignUpSuccess()),
        catchError((error) => {
          console.log(error);
          return of(new SignUpFailure({error: this.dataService.getErrors(error)}));
        })
      );
    })
  );

  @Effect()
  SignUpSuccess: Observable<any> = this.actions
    .ofType(AuthActionTypes.SIGNUP_SUCCESS)
    .pipe(
      switchMap(() => [
        new NotificationAdded('Pomyślnie zarejestrowano. Możesz się zalogować'),
        new CloseModal()
      ])
  );

  @Effect({dispatch: false})
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((error) => console.log(error.payload.error.error.errors))
  );

  @Effect()
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => new LogoutSuccess()),
        catchError((error) => {
          return of(new LogoutFailure(this.dataService.getErrors(error)));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogoutSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS)
  );

  @Effect({ dispatch: false })
  LogoutFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_FAILURE)
  );

}
