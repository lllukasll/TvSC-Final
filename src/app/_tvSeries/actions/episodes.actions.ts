import { Action } from '@ngrx/store';

export enum EpisodesActionTypes {
  ADD_WATCHED_EPISODE = '[Episode] ADD_WATCHED_EPISODE',
  ADD_WATCHED_EPISODE_SUCCESS = '[Episode] ADD_WATCHED_EPISODE_SUCCESS',
  ADD_WATCHED_EPISODE_FAILURE = '[Episode] ADD_WATCHED_EPISODE_FAILURE',
  REMOVE_WATCHED_EPISODE = '[Episode] REMOVE_WATCHED_EPISODE',
  REMOVE_WATCHED_EPISODE_SUCCESS = '[Episode] REMOVE_WATCHED_EPISODE_SUCCESS',
  REMOVE_WATCHED_EPISODE_FAILURE = '[Episode] REMOVE_WATCHED_EPISODE_FAILURE',
  ADD_WATCHED_SEASON = '[Episode] ADD_WATCHED_SEASON',
  ADD_WATCHED_SEASON_SUCCESS = '[Episode] ADD_WATCHED_SEASON_SUCCESS',
  ADD_WATCHED_SEASON_FAILURE = '[Episode] ADD_WATCHED_SEASON_FAILURE',
  REMOVE_WATCHED_SEASON = '[Episode] REMOVE_WATCHED_SEASON',
  REMOVE_WATCHED_SEASON_SUCCESS = '[Episode] REMOVE_WATCHED_SEASON_SUCCESS',
  REMOVE_WATCHED_SEASON_FAILURE = '[Episode] REMOVE_WATCHED_SEASON_FAILURE',
  GET_TV_SERIES_EPISODES = '[Episode] GET_TV_SERIES_EPISODES',
  GET_TV_SERIES_EPISODES_SUCCESS = '[Episode] GET_TV_SERIES_EPISODES_SUCCESS',
  GET_TV_SERIES_EPISODES_FAILURE = '[Episode] GET_TV_SERIES_EPISODES_FAILURE'
}

export class GetTvSeriesEpisodesAction implements Action {
  readonly type = EpisodesActionTypes.GET_TV_SERIES_EPISODES;
  constructor(public tvSeriesId: string) { }
}

export class GetTvSeriesEpisodesSuccessAction implements Action {
  readonly type = EpisodesActionTypes.GET_TV_SERIES_EPISODES_SUCCESS;
  constructor(public episodes: any[]) { }
}

export class GetTvSeriesEpisodesFailureAction implements Action {
  readonly type = EpisodesActionTypes.GET_TV_SERIES_EPISODES_FAILURE;
  constructor(public payload: any) { }
}

export class AddWatchedEpisodeAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE;
  constructor(public episodeId: number) { }
}

export class AddWatchedEpisodeSuccessAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE_SUCCESS;
  constructor(public episodeId: any) { }
}

export class AddWatchedEpisodeFailureAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE_FAILURE;
  constructor(public payload: any) { }
}

export class RemoveWatchedEpisodeAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_EPISODE;
  constructor(public episodeId: number) { }
}

export class RemoveWatchedEpisodeSuccessAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_EPISODE_SUCCESS;
  constructor(public episodeId: number) { }
}

export class RemoveWatchedEpisodeFailureAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_EPISODE_FAILURE;
  constructor(public payload: any) { }
}

export class AddWatchedSeasonAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_SEASON;
  constructor(public seasonId: number) { }
}

export class AddWatchedSeasonSuccessAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_SEASON_SUCCESS;
  constructor(public seasonId: number) { }
}

export class AddWatchedSeasonFailureAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_SEASON_FAILURE;
  constructor(public payload: any) { }
}

export class RemoveWatchedSeasonAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_SEASON;
  constructor(public seasonId: number) { }
}

export class RemoveWatchedSeasonSuccessAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_SEASON_SUCCESS;
  constructor(public seasonId: number) { }
}

export class RemoveWatchedSeasonFailureAction implements Action {
  readonly type = EpisodesActionTypes.REMOVE_WATCHED_SEASON_FAILURE;
  constructor(public payload: any) { }
}

export type All = AddWatchedEpisodeAction
  | AddWatchedEpisodeSuccessAction
  | AddWatchedEpisodeFailureAction
  | RemoveWatchedEpisodeAction
  | RemoveWatchedEpisodeSuccessAction
  | RemoveWatchedEpisodeFailureAction
  | AddWatchedSeasonAction
  | AddWatchedSeasonSuccessAction
  | AddWatchedSeasonFailureAction
  | RemoveWatchedSeasonAction
  | RemoveWatchedSeasonSuccessAction
  | RemoveWatchedSeasonFailureAction
  | GetTvSeriesEpisodesAction
  | GetTvSeriesEpisodesSuccessAction
  | GetTvSeriesEpisodesFailureAction;
