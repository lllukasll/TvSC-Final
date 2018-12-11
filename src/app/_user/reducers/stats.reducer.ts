import * as StatsActions from '../actions/stats.actions';
import { IStats } from '../models/stats';

export interface StatsState {
  stats: IStats;
}

const initialState: StatsState = {
  stats: null
};

export const getStates = (state: StatsState) => state.stats;

export function reducer(state = initialState, statsAction: StatsActions.All): StatsState {
  switch (statsAction.type) {
    case StatsActions.StatsActionTypes.GET_USER_STATS_SUCCESS: {
      return {
        ...state,
        stats: statsAction.stats
      };
    }
    default: {
      return state;
    }
  }
}
