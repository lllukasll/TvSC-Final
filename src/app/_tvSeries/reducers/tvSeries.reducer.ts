import * as TvShowAction from '../actions/tvSeries.actions';
import * as fromRoot from '../../reducers';
import { TvShow } from '../models/tvShow';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICalendarEpisode } from '../models/calendarEpisode';
import { IEpisode } from '../models/episode';

export interface TvSeriesState {
  tvShows: TvShow[];
  currentTvShow: TvShow;
  closestEpisode: IEpisode;
  currentMonthEpisodes: ICalendarEpisode[];
  currentWeekEpisodes: ICalendarEpisode[];
  isLoading: boolean;
}

const initialState: TvSeriesState = {
  tvShows: [],
  currentTvShow: null,
  closestEpisode: null,
  currentMonthEpisodes: [],
  currentWeekEpisodes: [],
  isLoading: false
};

export const getTvSeries = (state: TvSeriesState) => state.tvShows;
export const getCurrentTvSeries = (state: TvSeriesState) => state.currentTvShow;
export const getCurrentMonthEpisodes = (state: TvSeriesState) => state.currentMonthEpisodes;
export const getCurrentWeekEpisodes = (state: TvSeriesState) => state.currentWeekEpisodes;
export const getClosestEpisode = (state: TvSeriesState) => state.closestEpisode;

export function reducer(state = initialState, tvSeriesAction: TvShowAction.All): TvSeriesState {
  switch (tvSeriesAction.type) {
    case TvShowAction.TvSeriesActionTypes.GET_ALL_SUCCESS: {
      return {
        ...state,
        tvShows: tvSeriesAction.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_ONE_SUCCESS: {
      return {
        ...state,
        currentTvShow: tvSeriesAction.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES_SUCCESS: {
      return {
        ...state,
        currentMonthEpisodes: tvSeriesAction.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES_SUCCESS: {
      return {
        ...state,
        currentWeekEpisodes: tvSeriesAction.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.ADD_TV_SERIES_TO_FAVOURITE_SUCCESS: {
      const tmpTvShow = {...state.currentTvShow};
      tmpTvShow.isFavourite = true;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.REMOVE_TV_SERIES_FROM_FAVOURITES_SUCCESS: {
      const tmpTvShow = {...state.currentTvShow};
      tmpTvShow.isFavourite = false;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.ADD_TV_SERIES_RATING_SUCCESS: {
      const tmpTvShow = {...state.currentTvShow};
      tmpTvShow.userRatingDto = tvSeriesAction.tvSeriesRating;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.UPDATE_TV_SERIES_RATING_SUCCESS: {
      const tmpTvShow = {...state.currentTvShow};
      tmpTvShow.userRatingDto = tvSeriesAction.ratingModel;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE_SUCCESS: {
      return {
        ...state,
        closestEpisode: tvSeriesAction.closestEpisode
      };
    }
    default: {
      return state;
    }
  }
}

