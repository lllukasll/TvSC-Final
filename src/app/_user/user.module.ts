import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromUser from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './containers/user/user.component';

const userRoutes: Routes = [
  {
    path: 'user/:userId', component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', fromUser.reducers),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
