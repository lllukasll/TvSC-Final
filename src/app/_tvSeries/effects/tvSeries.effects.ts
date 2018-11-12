import { Actions, Effect, ofType } from '@ngrx/effects';
import { TvSeriesService } from '../services/tvSeries.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvSeriesActionTypes, LoadTvShowsAction, LoadTvShowsSuccessAction } from '../actions/tvSeries.actions';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HideSpinner, ShowSpinner } from '../../_shared/actions/spinner';

type showSpinnerTypes =
  | LoadTvShowsAction;

const showSpinnerActions = [
  TvSeriesActionTypes.GET_ALL
];

type hideSpinnerTypes =
  | LoadTvShowsSuccessAction;

const hideSpinnerActions = [
  TvSeriesActionTypes.GET_ALL_SUCCESS
];

@Injectable()
export class TvSeriesEffect  {
  constructor(private actions: Actions, private tvSeriesService: TvSeriesService) { }

  @Effect()
  showSpinner: Observable<Action> = this.actions
    .ofType<showSpinnerTypes>(...showSpinnerActions)
    .pipe(map(() => new ShowSpinner()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions
    .ofType<hideSpinnerTypes>(...hideSpinnerActions)
    .pipe(map(() => new HideSpinner()));

  @Effect()
  GetAll: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ALL),
    map((action: LoadTvShowsAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getAll(payload)),
    map(tvShows => (new LoadTvShowsSuccessAction(tvShows.dtoObject))
  ));
}
