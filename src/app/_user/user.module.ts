import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromUser from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './containers/user-profile/user.component';
import { SidebarComponent } from './components/user-profile/sidebar/sidebar.component';
import { InfoPageComponent } from './components/user-profile/info-page/info-page.component';
import { MyFavouriteComponent } from './components/user-profile/my-favourite/my-favourite.component';
import { HistoryComponent } from './components/user-profile/history/history.component';
import { SettingsComponent } from './components/user-profile/settings/settings.component';
import { NotificationEffect } from './effects/notification.effect';
import { UserTvSeriesEffect } from './effects/userTvSeries.effect';
import { SharedModule } from '../_shared/shared.module';
import { StatsEffect } from './effects/stats.effect';

const userRoutes: Routes = [
  {
    path: 'user/:userId', component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('userModule', fromUser.reducers),
    EffectsModule.forFeature([AuthEffects, NotificationEffect, UserTvSeriesEffect, StatsEffect]),
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UserComponent,
    SidebarComponent,
    InfoPageComponent,
    MyFavouriteComponent,
    HistoryComponent,
    SettingsComponent
  ]
})
export class UserModule { }
