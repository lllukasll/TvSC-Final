import * as UserTvSeriesActions from '../actions/tvSeries.actions';
import { IFavouriteTvSeries } from '../models/tvSeries';
import { IUserWatchedEpisodes } from '../models/episodes';
import { ITvSeriesProposition } from '../models/tvSeriesProposition';

export interface FavouriteTvSeriesState {
  facouriteTvSeries: IFavouriteTvSeries[];
  lastWatchedEpisodes: IUserWatchedEpisodes[];
  propositions: ITvSeriesProposition[];
}

const initialState: FavouriteTvSeriesState = {
  facouriteTvSeries: [],
  lastWatchedEpisodes: [],
  propositions: []
};

export const getFavouriteTvSeries = (state: FavouriteTvSeriesState) => state.facouriteTvSeries;
export const getLastWatchedEpisodes = (state: FavouriteTvSeriesState) => state.lastWatchedEpisodes;
export const getPropositions = (state: FavouriteTvSeriesState) => state.propositions;

export function reducer(state = initialState, favouriteTvSeriesAction: UserTvSeriesActions.All): FavouriteTvSeriesState {
  switch (favouriteTvSeriesAction.type) {
    case UserTvSeriesActions.TvSeriesActionTypes.GET_FAVOURITE_TV_SERIES_SUCCESS: {
      return {
        ...state,
        facouriteTvSeries: favouriteTvSeriesAction.tvSeries
      };
    }
    case UserTvSeriesActions.TvSeriesActionTypes.GET_LAST_WATCHED_EPISODES_SUCCESS: {
      return {
        ...state,
        lastWatchedEpisodes: favouriteTvSeriesAction.episodes
      };
    }
    case UserTvSeriesActions.TvSeriesActionTypes.GET_PROPOSITIONS_SUCCESS: {
      return {
        ...state,
        propositions: favouriteTvSeriesAction.propositions
      };
    }
    default: {
      return state;
    }
  }
}
