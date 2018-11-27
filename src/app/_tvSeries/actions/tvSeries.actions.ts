import { Action } from '@ngrx/store';
import { TvShow } from '../models/tvShow';
import { ICalendarEpisode } from '../models/calendarEpisode';
import { IEpisode } from '../models/episode';

export enum TvSeriesActionTypes {
  GET_ALL = '[TvSeries] GET_ALL',
  GET_ALL_SUCCESS = '[TvSeries] GET_ALL_SUCCESS',
  GET_ONE = '[TvSeries] GET_ONE',
  GET_ONE_SUCCESS = '[TvSeries] GET_ONE_SUCCESS',
  GET_CURRENT_MONTH_EPISODES = '[TvSeries] GET_CURRENT_MONTH_EPISODES',
  GET_CURRENT_MONTH_EPISODES_SUCCESS = '[TvSeries] GET_CURRENT_MONTH_EPISODES_SUCCESS',
  GET_CURRENT_WEEK_EPISODES = '[TvSeries] GET_CURRENT_WEEK_EPISODES',
  GET_CURRENT_WEEK_EPISODES_SUCCESS = '[TvSeries] GET_CURRENT_WEEK_EPISODES_SUCCESS',
  ADD_TV_SERIES_TO_FAVOURITE = '[TvSeries] ADD_TV_SERIES_TO_FAVOURITE',
  ADD_TV_SERIES_TO_FAVOURITE_SUCCESS = '[TvSeries] ADD_TV_SERIES_TO_FAVOURITE_SUCCESS',
  ADD_TV_SERIES_TO_FAVOURITE_FAILURE = '[TvSeries] ADD_TV_SERIES_TO_FAVOURITE_FAILURE',
  REMOVE_TV_SERIES_FROM_FAVOURITES = '[TvSeries] REMOVE_TV_SERIES_FROM_FAVOURITES',
  REMOVE_TV_SERIES_FROM_FAVOURITES_SUCCESS = '[TvSeries] REMOVE_TV_SERIES_FROM_FAVOURITES_SUCCESS',
  REMOVE_TV_SERIES_FROM_FAVOURITES_FAILURE = '[TvSeries] REMOVE_TV_SERIES_FROM_FAVOURITES_FAILURE',
  ADD_TV_SERIES_RATING = '[TvSeries] ADD_TV_SERIES_RATING',
  ADD_TV_SERIES_RATING_SUCCESS = '[TvSeries] ADD_TV_SERIES_RATING_SUCCESS',
  ADD_TV_SERIES_RATING_FAILURE = '[TvSeries] ADD_TV_SERIES_RATING_FAILURE',
  UPDATE_TV_SERIES_RATING = '[TvSeries] UPDATE_TV_SERIES_RATING',
  UPDATE_TV_SERIES_RATING_SUCCESS = '[TvSeries] UPDATE_TV_SERIES_RATING_SUCCESS',
  UPDATE_TV_SERIES_RATING_FAILURE = '[TvSeries] UPDATE_TV_SERIES_RATING_FAILURE',
  GET_TV_SERIES_CLOSEST_EPISODE = '[TvSeries] GET_TV_SERIES_CLOSEST_EPISODE',
  GET_TV_SERIES_CLOSEST_EPISODE_SUCCESS = '[TvSeries] GET_TV_SERIES_CLOSEST_EPISODE_SUCCESS',
  GET_TV_SERIES_CLOSEST_EPISODE_FAILURE = '[TvSeries] GET_TV_SERIES_CLOSEST_EPISODE_FAILURE'
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

export class AddTvSeriesToFavouriteAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_TO_FAVOURITE;
  constructor(public tvSeriesId: string) { }
}

export class AddTvSeriesToFavouriteSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_TO_FAVOURITE_SUCCESS;
  constructor() { }
}

export class AddTvSeriesToFavouriteFailureAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_TO_FAVOURITE_FAILURE;
  constructor(public payload: any) { }
}

export class RemoveTvSeriesFromFavourites implements Action {
  readonly type = TvSeriesActionTypes.REMOVE_TV_SERIES_FROM_FAVOURITES;
  constructor(public tvSeriesId: string) { }
}

export class RemoveTvSeriesFromFavouritesSuccess implements Action {
  readonly type = TvSeriesActionTypes.REMOVE_TV_SERIES_FROM_FAVOURITES_SUCCESS;
}

export class RemoveTvSeriesFromFavouritesFailure implements Action {
  readonly type = TvSeriesActionTypes.REMOVE_TV_SERIES_FROM_FAVOURITES_FAILURE;
  constructor(public payload: any) { }
}

export class AddTvSeriesRatingAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_RATING;
  constructor(public tvSeriesRating: any, public tvSeriesId: string) { }
}

export class AddTvSeriesRatingSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_RATING_SUCCESS;
  constructor(public tvSeriesRating: any) {
   }
}

export class AddTvSeriesRatingFailureAction implements Action {
  readonly type = TvSeriesActionTypes.ADD_TV_SERIES_RATING_FAILURE;
  constructor(public payload: any) { }
}

export class UpdateTvSeriesRatingAction implements Action {
  readonly type = TvSeriesActionTypes.UPDATE_TV_SERIES_RATING;
  constructor(public ratingId: number, public ratingModel: any) { }
}

export class UpdateTvSeriesRatingSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.UPDATE_TV_SERIES_RATING_SUCCESS;
  constructor(public ratingModel: any) { }
}

export class UpdateTvSeriesRatingFailureAction implements Action {
  readonly type = TvSeriesActionTypes.UPDATE_TV_SERIES_RATING_FAILURE;
  constructor(public payload: any) { }
}

export class GetTvSeriesClosestEpisodeAction implements Action {
  readonly type = TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE;
  constructor(public tvSeriesId: string) { }
}

export class GetTvSeriesClosestEpisodeSuccessAction implements Action {
  readonly type = TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE_SUCCESS;
  constructor(public closestEpisode: IEpisode) { }
}

export class GetTvSeriesClosestEpisodeFailureAction implements Action {
  readonly type = TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | LoadTvShowsAction
  | LoadTvShowsSuccessAction
  | LoadTvShowAction
  | LoadTvShowSuccessAction
  | GetCurrentMonthEpisodesAction
  | GetCurrentMonthEpisodesSuccessAction
  | GetCurrentWeekEpisodesAction
  | GetCurrentWeekEpisodesSuccessAction
  | AddTvSeriesToFavouriteAction
  | AddTvSeriesToFavouriteSuccessAction
  | AddTvSeriesToFavouriteFailureAction
  | RemoveTvSeriesFromFavourites
  | RemoveTvSeriesFromFavouritesSuccess
  | RemoveTvSeriesFromFavouritesFailure
  | AddTvSeriesRatingAction
  | AddTvSeriesRatingSuccessAction
  | AddTvSeriesRatingFailureAction
  | UpdateTvSeriesRatingAction
  | UpdateTvSeriesRatingSuccessAction
  | UpdateTvSeriesRatingFailureAction
  | GetTvSeriesClosestEpisodeAction
  | GetTvSeriesClosestEpisodeSuccessAction
  | GetTvSeriesClosestEpisodeFailureAction;
