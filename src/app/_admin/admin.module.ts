import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvSeriesModule } from '../_tvSeries/tv-series.module';
import { AdminPanelComponent } from './containers/admin-panel/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { UsersComponent } from './components/users/users.component';
import { ActorsComponent } from './components/actors/actors.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../_shared/shared.module';
import { ChooseTvSeriesBarComponent } from './components/tv-series/choose-tv-series-bar/choose-tv-series-bar.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent}
];

@NgModule({
  imports: [
    CommonModule,
    TvSeriesModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminPanelComponent,
    TvSeriesComponent,
    UsersComponent,
    ActorsComponent,
    CategoriesComponent,
    SidebarComponent,
    ChooseTvSeriesBarComponent
  ]
})
export class AdminModule { }
