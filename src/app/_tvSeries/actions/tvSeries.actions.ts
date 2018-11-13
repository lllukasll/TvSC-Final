import { Action } from '@ngrx/store';
import { TvShow } from '../models/tvShow';

export enum TvSeriesActionTypes {
  GET_ALL = '[TvSeries] GET_ALL',
  GET_ALL_SUCCESS = '[TvSeries] GET_ALL_SUCCESS',
  GET_ONE = '[TvSeries] GET_ONE',
  GET_ONE_SUCCESS = '[TvSeries] GET_ONE_SUCCESS';
}

export class LoadTvShowsAction implements Action {
  readonly type = TvSeriesActionTypes.GET_ALL;
  constructor(public payload: any) { }
}

export class LoadTvShowsSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_ALL_SUCCESS;
  constructor(public payload: TvShow[]) {
  }
}

export class LoadTvShowAction implements Action {
  readonly type = TvSeriesActionTypes.GET_ONE;
  constructor(public payload: any) { }
}

export class LoadTvShowSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_ONE_SUCCESS;
  constructor(public payload: TvShow) { }
}

export type All =
  | LoadTvShowsAction
  | LoadTvShowsSuccessAction
  | LoadTvShowAction
  | LoadTvShowSuccessAction;
