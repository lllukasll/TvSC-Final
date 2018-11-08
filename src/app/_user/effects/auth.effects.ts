import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, Logout } from '../actions/auth.actions';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects  {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          console.log('Login : ' + user);
          return new LogInSuccess();
        }),
        catchError((error => {
          console.log(error);
          return of(new LogInFailure({error: error}));
        }))
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
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
          return of(new SignUpFailure({error: error}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigateByUrl('/'))
  );

  @Effect({dispatch: false})
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((error) => console.log(error.payload.error.error.errors))
  );

  @Effect({dispatch: false})
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => {console.log('Poprawnie wylogowano'); }),
        catchError((error) => {
          return of(console.log(error));
        })
      );
    })
  );
}
