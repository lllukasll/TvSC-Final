import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTvSeries from './reducers/tvSeries.reducer';
import { TvSeriesEffect } from './effects/tvSeries.effects';
import { TvSeriesListComponent } from './containers/tv-series-list/tv-series-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TvSeriesListCardComponent } from './components/tv-series-list-card/tv-series-list-card.component';

const tvSeriesRoutes: Routes = [
  { path: 'tvSeries', component: TvSeriesListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tvSeries', fromTvSeries.reducer),
    EffectsModule.forFeature([TvSeriesEffect]),
    RouterModule.forChild(tvSeriesRoutes)
  ],
  declarations: [TvSeriesListComponent, TvSeriesListCardComponent]
})
export class TvSeriesModule { }
