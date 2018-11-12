import { Action } from '@ngrx/store';
import { TvShow } from '../models/tvShow';

export enum TvSeriesActionTypes {
  GET_ALL = '[TvSeries] GET_ALL',
  GET_ALL_SUCCESS = '[TvSeries] GET_ALL_SUCCESS',
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

export type All =
  | LoadTvShowsAction
  | LoadTvShowsSuccessAction;
