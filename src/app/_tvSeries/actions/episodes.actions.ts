import { Action } from '@ngrx/store';

export enum EpisodesActionTypes {
  ADD_WATCHED_EPISODE = '[Episode] ADD_WATCHED_EPISODE',
  ADD_WATCHED_EPISODE_SUCCESS = '[Episode] ADD_WATCHED_EPISODE_SUCCESS',
  ADD_WATCHED_EPISODE_FAILURE = '[Episode] ADD_WATCHED_EPISODE_FAILURE'
}

export class AddWatchedEpisodeAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE;
  constructor(public episodeId: number) { }
}

export class AddWatchedEpisodeSuccessAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE_SUCCESS;
  constructor( ) { }
}

export class AddWatchedEpisodeFailureAction implements Action {
  readonly type = EpisodesActionTypes.ADD_WATCHED_EPISODE_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | AddWatchedEpisodeAction
  | AddWatchedEpisodeSuccessAction
  | AddWatchedEpisodeFailureAction;
