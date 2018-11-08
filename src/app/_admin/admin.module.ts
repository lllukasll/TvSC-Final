import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvSeriesModule } from '../_tvSeries/tv-series.module';
import { AdminPanelComponent } from './containers/admin-panel/admin-panel.component';
import { Routes, RouterModule } from '@angular/router';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent}
];

@NgModule({
  imports: [
    CommonModule,
    TvSeriesModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminPanelComponent
  ]
})
export class AdminModule { }
