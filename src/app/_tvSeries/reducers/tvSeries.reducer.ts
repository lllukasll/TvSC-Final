import * as TvShowAction from '../actions/tvSeries.actions';
import * as fromRoot from '../../reducers';
import { TvShow } from '../models/tvShow';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICalendarEpisode } from '../models/calendarEpisode';

export interface State extends fromRoot.State {
  tvSeries: TvSeriesState;
}

export interface TvSeriesState {
  tvShows: TvShow[];
  currentTvShow: TvShow;
  currentMonthEpisodes: ICalendarEpisode[];
  isLoading: boolean;
}

const initialState: TvSeriesState = {
  tvShows: [],
  currentTvShow: null,
  currentMonthEpisodes: [],
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
    default: {
      return state;
    }
  }
}
