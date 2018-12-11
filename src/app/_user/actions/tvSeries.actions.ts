import { Action } from '@ngrx/store';
import { IFavouriteTvSeries } from '../models/tvSeries';

export enum TvSeriesActionTypes {
  GET_FAVOURITE_TV_SERIES = '[TvSeries] GET_FAVOURITE_TV_SERIES',
  GET_FAVOURITE_TV_SERIES_SUCCESS = '[TvSeries] GET_FAVOURITE_TV_SERIES_SUCCESS',
  GET_FAVOURITE_TV_SERIES_FAILURE = '[TvSeries] GET_FAVOURITE_TV_SERIES_FAILURE',

  GET_LAST_WATCHED_EPISODES = '[UserTvSeries] GET_LAST_WATCHED_EPISODES',
  GET_LAST_WATCHED_EPISODES_SUCCESS = '[UserTvSeries] GET_LAST_WATCHED_EPISODES_SUCCESS',
  GET_LAST_WATCHED_EPISODES_FAILURE = '[UserTvSeries] GET_LAST_WATCHED_EPISODES_FAILURE',

  GET_PROPOSITIONS = '[UserTvSeries] GET_PROPOSITIONS',
  GET_PROPOSITIONS_SUCCESS = '[UserTvSeries] GET_PROPOSITIONS_SUCCESS',
  GET_PROPOSITIONS_FAILURE = '[UserTvSeries] GET_PROPOSITIONS_FAILURE'
}

export class GetFavouriteTvSeriesAction implements Action {
  readonly type = TvSeriesActionTypes.GET_FAVOURITE_TV_SERIES;
  constructor() { }
}

export class GetFavouriteTvSeriesSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_FAVOURITE_TV_SERIES_SUCCESS;
  constructor(public tvSeries: any[]) { }
}

export class GetFavouriteTvSeriesFailreAction implements Action {
  readonly type = TvSeriesActionTypes.GET_FAVOURITE_TV_SERIES_FAILURE;
  constructor(public payload: any) { }
}

export class GetLastWatchedEpisodesAction implements Action {
  readonly type = TvSeriesActionTypes.GET_LAST_WATCHED_EPISODES;
  constructor(public numberOfEpisodes: number) { }
}

export class GetLastWatchedEpisodesSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_LAST_WATCHED_EPISODES_SUCCESS;
  constructor(public episodes: any[]) { }
}

export class GetLastWatchedEpisodesFailureAction implements Action {
  readonly type = TvSeriesActionTypes.GET_LAST_WATCHED_EPISODES_FAILURE;
  constructor(public payload: any) { }
}

export class GetPropostionsAction implements Action {
  readonly type = TvSeriesActionTypes.GET_PROPOSITIONS;
  constructor() { }
}

export class GetPropostionsSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_PROPOSITIONS_SUCCESS;
  constructor(public propositions: any[]) { }
}

export class GetPropostionsFailureAction implements Action {
  readonly type = TvSeriesActionTypes.GET_PROPOSITIONS_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | GetFavouriteTvSeriesAction
  | GetFavouriteTvSeriesSuccessAction
  | GetFavouriteTvSeriesFailreAction
  | GetLastWatchedEpisodesAction
  | GetLastWatchedEpisodesSuccessAction
  | GetLastWatchedEpisodesFailureAction
  | GetPropostionsAction
  | GetPropostionsSuccessAction
  | GetPropostionsFailureAction;
