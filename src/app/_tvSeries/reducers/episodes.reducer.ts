import * as EpisodeAction from '../actions/episodes.actions';
import * as fromRoot from '../../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISeason } from '../models/season';

export interface EpisodeState {
  watchedEpisodesId: number[];
  episodes: ISeason[];
  episodesLoading: boolean;
}

const initialState: EpisodeState = {
  watchedEpisodesId: [],
  episodes: [],
  episodesLoading: false
};

export const getEpisodes = (state: EpisodeState) => state.episodes;
export const getEpisodesLoading = (state: EpisodeState) => state.episodesLoading;
export const getWatchedEpisodes = (state: EpisodeState) => state.watchedEpisodesId;

export function reducer(state = initialState, episodeAction: EpisodeAction.All): EpisodeState {
  switch (episodeAction.type) {
    case EpisodeAction.EpisodesActionTypes.GET_TV_SERIES_EPISODES: {
      return {
        ...state,
        episodesLoading: true
      };
    }
    case EpisodeAction.EpisodesActionTypes.GET_TV_SERIES_EPISODES_SUCCESS: {
      return {
        ...state,
        episodesLoading: false,
        episodes: episodeAction.episodes
      };
    }
    case EpisodeAction.EpisodesActionTypes.GET_TV_SERIES_EPISODES_FAILURE: {
      return {
        ...state,
        episodesLoading: false
      };
    }
    case EpisodeAction.EpisodesActionTypes.ADD_WATCHED_EPISODE_SUCCESS: {
      const tmpSeason = [...state.episodes];
      tmpSeason.forEach(season => {
        season.episodes.forEach(episode => {
          if (episode.id === episodeAction.episodeId) {
            episode.watched = true;
          }
        });
        let seasonWatched = true;
        season.episodes.forEach(episode => {
          if (episode.watched === false) {
            seasonWatched = false;
          }
        });
        season.watched = seasonWatched;
      });
      return {
        ...state,
        episodes: tmpSeason
      };
    }
    case EpisodeAction.EpisodesActionTypes.REMOVE_WATCHED_EPISODE_SUCCESS: {
      const tmpSeason = [...state.episodes];
      tmpSeason.forEach(season => {
        season.episodes.forEach(episode => {
          if (episode.id === episodeAction.episodeId) {
            season.watched = false;
            episode.watched = false;
          }
        });
      });
      return {
        ...state,
        episodes: tmpSeason
      };
    }
    case EpisodeAction.EpisodesActionTypes.ADD_WATCHED_SEASON_SUCCESS: {
      const tmpSeasons = [...state.episodes];
      tmpSeasons.forEach(season => {
        if (season.id === episodeAction.seasonId) {
          season.watched = true;
          season.episodes.forEach(episode => {
            episode.watched = true;
          });
        }
      });
      return {
        ...state,
        episodes: tmpSeasons
      };
    }
    case EpisodeAction.EpisodesActionTypes.REMOVE_WATCHED_SEASON_SUCCESS: {
      const tmpSeasons = [...state.episodes];
      tmpSeasons.forEach(season => {
        if (season.id === episodeAction.seasonId) {
          season.watched = false;
          season.episodes.forEach(episode => {
            episode.watched = false;
          });
        }
      });
      return {
        ...state,
        episodes: tmpSeasons
      };
    }
    default: {
      return state;
    }
  }
}
