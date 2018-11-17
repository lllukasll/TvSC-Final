import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginFormOpened: boolean;
  registerFormOpened: boolean;
  constructor() {
    this.loginFormOpened = false;
    this.registerFormOpened = false;
  }

  toogleLoginForm(): void {
    this.loginFormOpened = !this.loginFormOpened;
  }

  toogleRegisterForm(): void {
    this.registerFormOpened = !this.registerFormOpened;
  }

  ngOnInit() {
  }

}
