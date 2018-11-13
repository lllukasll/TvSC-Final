import * as TvShowAction from '../actions/tvSeries.actions';
import * as fromRoot from '../../reducers';
import { TvShow } from '../models/tvShow';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  tvSeries: TvSeriesState;
}

export interface TvSeriesState {
  tvShows: TvShow[];
  currentTvShow: TvShow;
  isLoading: boolean;
}

const initialState: TvSeriesState = {
  tvShows: [],
  currentTvShow: null,
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
    default: {
      return state;
    }
  }
}
