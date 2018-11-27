import * as TvShowAction from '../actions/tvSeries.actions';
import * as fromRoot from '../../reducers';
import { TvShow } from '../models/tvShow';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICalendarEpisode } from '../models/calendarEpisode';
import { IEpisode } from '../models/episode';

export interface State extends fromRoot.State {
  tvSeries: TvSeriesState;
}

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

const getTvSeriesState = createFeatureSelector<TvSeriesState>('tvSeries');

export const getTvSeries = createSelector(
  getTvSeriesState,
  state => state.tvShows
);

export const getCurrentTvSeries = createSelector(
  getTvSeriesState,
  state => state.currentTvShow
);

export const getCurrentMonthEpisodes = createSelector(
  getTvSeriesState,
  state => state.currentMonthEpisodes
);

export const getCurrentWeekEpisodes = createSelector(
  getTvSeriesState,
  state => state.currentWeekEpisodes
);

export const getClosestEpisode = createSelector(
  getTvSeriesState,
  state => state.closestEpisode
);

export function reducer(state = initialState, action: TvShowAction.All): TvSeriesState {
  switch (action.type) {
    case TvShowAction.TvSeriesActionTypes.GET_ALL_SUCCESS: {
      return {
        ...state,
        tvShows: action.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_ONE_SUCCESS: {
      return {
        ...state,
        currentTvShow: action.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES_SUCCESS: {
      return {
        ...state,
        currentMonthEpisodes: action.payload
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES_SUCCESS: {
      return {
        ...state,
        currentWeekEpisodes: action.payload
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
      tmpTvShow.userRatingDto = action.tvSeriesRating;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.UPDATE_TV_SERIES_RATING_SUCCESS: {
      const tmpTvShow = {...state.currentTvShow};
      tmpTvShow.userRatingDto = action.ratingModel;
      return {
        ...state,
        currentTvShow: tmpTvShow
      };
    }
    case TvShowAction.TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE_SUCCESS: {
      return {
        ...state,
        closestEpisode: action.closestEpisode
      };
    }
    default: {
      return state;
    }
  }
}
