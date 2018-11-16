import { Action } from '@ngrx/store';
import { TvShow } from '../models/tvShow';
import { ICalendarEpisode } from '../models/calendarEpisode';

export enum TvSeriesActionTypes {
  GET_ALL = '[TvSeries] GET_ALL',
  GET_ALL_SUCCESS = '[TvSeries] GET_ALL_SUCCESS',
  GET_ONE = '[TvSeries] GET_ONE',
  GET_ONE_SUCCESS = '[TvSeries] GET_ONE_SUCCESS',
  GET_CURRENT_MONTH_EPISODES = '[TvSeries] GET_CURRENT_MONTH_EPISODES',
  GET_CURRENT_MONTH_EPISODES_SUCCESS = '[TvSeries] GET_CURRENT_MONTH_EPISODES_SUCCESS',
  GET_CURRENT_WEEK_EPISODES = '[TvSeries] GET_CURRENT_WEEK_EPISODES',
  GET_CURRENT_WEEK_EPISODES_SUCCESS = '[TvSeries] GET_CURRENT_WEEK_EPISODES_SUCCESS'
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

export class GetCurrentMonthEpisodesAction implements Action {
  readonly type = TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES;
  constructor(public payload: any) { }
}

export class GetCurrentMonthEpisodesSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES_SUCCESS;
  constructor(public payload: ICalendarEpisode[]) { }
}

export class GetCurrentWeekEpisodesAction implements Action {
  readonly type = TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES;
  constructor(public payload: any) { }
}

export class GetCurrentWeekEpisodesSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES_SUCCESS;
  constructor(public payload: ICalendarEpisode[]) { }
}

export type All =
  | LoadTvShowsAction
  | LoadTvShowsSuccessAction
  | LoadTvShowAction
  | LoadTvShowSuccessAction
  | GetCurrentMonthEpisodesAction
  | GetCurrentMonthEpisodesSuccessAction
  | GetCurrentWeekEpisodesAction
  | GetCurrentWeekEpisodesSuccessAction;
