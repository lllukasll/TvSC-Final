import { Actions, Effect, ofType } from '@ngrx/effects';
import { TvSeriesService } from '../services/tvSeries.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvSeriesActionTypes, LoadTvShowsAction, LoadTvShowsSuccessAction } from '../actions/tvSeries.actions';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TvSeriesEffect  {
  constructor(private actions: Actions, private tvSeriesService: TvSeriesService) { }

  @Effect()
  GetAll: Observable<any> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ALL),
    switchMap(() => this.tvSeriesService.getAll()),
    map(tvShows => (new LoadTvShowsSuccessAction(tvShows.dtoObject))
  ));
}
