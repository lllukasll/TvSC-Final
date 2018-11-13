import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTvSeries from './reducers/tvSeries.reducer';
import { TvSeriesEffect } from './effects/tvSeries.effects';
import { TvSeriesListComponent } from './containers/tv-series-list/tv-series-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TvSeriesListCardComponent } from './components/tv-series-list/tv-series-list-card/tv-series-list-card.component';
import { TvSeriesListSidebarComponent } from './components/tv-series-list/tv-series-list-sidebar/tv-series-list-sidebar.component';
import { TvSeriesListSortBarComponent } from './components/tv-series-list/tv-series-list-sort-bar/tv-series-list-sort-bar.component';
import { TvSeriesCalendarComponent } from './containers/tv-series-calendar/tv-series-calendar.component';
import { SharedModule } from '../_shared/shared.module';
import { TvSeriesListPaginationComponent } from './components/tv-series-list/tv-series-list-pagination/tv-series-list-pagination.component';
import { TvSeriesDetailsComponent } from './containers/tv-series-details/tv-series-details.component';
import { TvSeriesDetailsRatingComponent } from './components/tv-series-details/tv-series-details-rating/tv-series-details-rating.component';
// tslint:disable-next-line:max-line-length
import { TvSeriesDetailsSeasonsComponent } from './components/tv-series-details/tv-series-details-seasons/tv-series-details-seasons.component';
import { TvSeriesDetailsCastComponent } from './components/tv-series-details/tv-series-details-cast/tv-series-details-cast.component';

const tvSeriesRoutes: Routes = [
  { path: 'tvSeries', component: TvSeriesListComponent},
  { path: 'tvSeries/:id', component: TvSeriesDetailsComponent},
  { path: 'calendar', component: TvSeriesCalendarComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('tvSeries', fromTvSeries.reducer),
    EffectsModule.forFeature([TvSeriesEffect]),
    RouterModule.forChild(tvSeriesRoutes)
  ],
  declarations: [
    TvSeriesListComponent,
    TvSeriesListCardComponent,
    TvSeriesListSidebarComponent,
    TvSeriesListSortBarComponent,
    TvSeriesCalendarComponent,
    TvSeriesListPaginationComponent,
    TvSeriesDetailsComponent,
    TvSeriesDetailsRatingComponent,
    TvSeriesDetailsSeasonsComponent,
    TvSeriesDetailsCastComponent
  ]
})
export class TvSeriesModule { }
