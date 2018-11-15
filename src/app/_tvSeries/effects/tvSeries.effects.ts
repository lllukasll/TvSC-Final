import { Actions, Effect, ofType } from '@ngrx/effects';
import { TvSeriesService } from '../services/tvSeries.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TvSeriesActionTypes,
  LoadTvShowsAction,
  LoadTvShowsSuccessAction,
  LoadTvShowAction,
  LoadTvShowSuccessAction,
  GetCurrentMonthEpisodesAction,
  GetCurrentMonthEpisodesSuccessAction } from '../actions/tvSeries.actions';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HideSpinner, ShowSpinner } from '../../_shared/actions/spinner';

type showSpinnerTypes =
  | LoadTvShowsAction
  | LoadTvShowAction
  | GetCurrentMonthEpisodesAction;

const showSpinnerActions = [
  TvSeriesActionTypes.GET_ALL,
  TvSeriesActionTypes.GET_ONE,
  TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES
];

type hideSpinnerTypes =
  | LoadTvShowsSuccessAction
  | LoadTvShowSuccessAction
  | GetCurrentMonthEpisodesSuccessAction;

const hideSpinnerActions = [
  TvSeriesActionTypes.GET_ALL_SUCCESS,
  TvSeriesActionTypes.GET_ONE_SUCCESS,
  TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES_SUCCESS
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
  GetCurrentMonthEpisodes: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES),
    map((action: GetCurrentMonthEpisodesAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getCurrentMonthEpisodes(payload)),
    map(episodes => (new GetCurrentMonthEpisodesSuccessAction(episodes.dtoObject)))
  );

  @Effect()
  GetAll: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ALL),
    map((action: LoadTvShowsAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getAll(payload)),
    map(tvShows => (new LoadTvShowsSuccessAction(tvShows.dtoObject))
  ));

  @Effect()
  GetOne: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ONE),
    map((action: LoadTvShowAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getOne(payload)),
    map(tvShow => (new LoadTvShowSuccessAction(tvShow.dtoObject)))
  );
}
