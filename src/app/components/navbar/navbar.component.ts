import { Component, OnInit, DoCheck, SimpleChanges, OnChanges } from '@angular/core';
import FormModel from '../../models/formModel';
import { Credentials } from '../../_user/models/credentials';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../_user/reducers';
import * as fromShared from '../../_shared/reducers';
import { LogIn, Logout } from '../../_user/actions/auth.actions';
import { isSpinnerShowing } from '../../_shared/reducers/index';
import { LoginModalOpen, RegisterModalOpen, CloseModal } from '../../_shared/actions/modal';
import { isLoginModalOpened } from '../../_shared/reducers/index';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginModel: Credentials = new Credentials();

  loginFormOpened: boolean;
  loginErrors$: any;
  registerFormOpened: boolean;
  isloading$ = false;
  loginFormSettings: FormModel[] = [
    { label: '', placeholder: 'Podaj email...', type: 'text', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true
        }, listElements: []
    },
    { label: '', placeholder: 'Podaj hasło...', type: 'password', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        }, listElements: []
    },
  ];
  registerForm: FormModel[];
  isAuthenticated$ = false;
  loggedUser$: any = null;

  constructor(private store: Store<fromAuth.State>) {
    this.loginFormOpened = false;
    this.registerFormOpened = false;
  }

  toogleLoginForm(): void {
    if (this.loginFormOpened) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new LoginModalOpen()));
    }
  }

  toogleRegisterForm(): void {
    if (this.registerFormOpened) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new RegisterModalOpen()));
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  onLogoutClicked = () => {
    this.store.dispatch(new Logout());
  }

  onLoginSubmit = (loginForm: any) => {
    const payload = {
      email: loginForm[0].value,
      password: loginForm[1].value
    };

    this.store.dispatch(new LogIn(payload));
  }

  ngOnInit() {
    this.store.select(isSpinnerShowing).subscribe(
      loading => this.isloading$ = loading
    );

    this.store.select(fromAuth.getAuthError).subscribe(
      errors => { this.loginErrors$ = errors; }
    );

    this.store.select(fromAuth.getAuthState).subscribe(
      authState => { this.isAuthenticated$ = authState; }
    );

    this.store.select(fromAuth.getLoggedUser).subscribe(
      loggedUser => { this.loggedUser$ = loggedUser; }
    );

    //this.loginFormOpened = this.store.select(fromShared.isLoginModalOpened);
    this.store.pipe(select(fromShared.isLoginModalOpened)).subscribe(
      loginModalState => { this.loginFormOpened = loginModalState; }
    );

    this.store.select(fromShared.isRegisterModalOpened).subscribe(
      registerModalState => { this.registerFormOpened = registerModalState; }
    );
  }

}
