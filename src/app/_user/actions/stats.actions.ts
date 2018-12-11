import { Action } from '@ngrx/store';
import { IStats } from '../models/stats';

export enum StatsActionTypes {
  GET_USER_STATS = '[Stats] GET_USER_STATS',
  GET_USER_STATS_SUCCESS = '[Stats] GET_USER_STATS_SUCCESS',
  GET_USER_STATS_FAILURE = '[Stats] GET_USER_STATS_FAILURE'
}

export class GetUserStatsAction implements Action {
  readonly type = StatsActionTypes.GET_USER_STATS;
  constructor() { }
}

export class GetUserStatsSuccessAction implements Action {
  readonly type = StatsActionTypes.GET_USER_STATS_SUCCESS;
  constructor(public stats: any) { }
}

export class GetUserStatsFailureAction implements Action {
  readonly type = StatsActionTypes.GET_USER_STATS_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | GetUserStatsAction
  | GetUserStatsSuccessAction
  | GetUserStatsFailureAction;
