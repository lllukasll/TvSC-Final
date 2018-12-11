import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../reducers';
import * as fromNotification from '../reducers/notification.reducer';
import * as fromUserTvSeries from '../reducers/userTvSeries.reducer';
import * as fromStats from '../reducers/stats.reducer';

export interface UserState {
  auth: fromAuth.State;
  notification: fromNotification.NotificationState;
  userTvSeries: fromUserTvSeries.FavouriteTvSeriesState;
  stats: fromStats.StatsState;
}

export interface State extends fromRoot.State {
  auth: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  auth: fromAuth.reducer,
  notification: fromNotification.reducer,
  userTvSeries: fromUserTvSeries.reducer,
  stats: fromStats.reducer
};


const getUserModuleEntity = createFeatureSelector<UserState>('userModule');

export const selectAuthEntity = createSelector(
  getUserModuleEntity, (state: UserState) => state.auth
);

export const selectNotificationEntity = createSelector(
  getUserModuleEntity, (state: UserState) => state.notification
);

export const selectUserTvSeriesEntity = createSelector(
  getUserModuleEntity, (state: UserState) => state.userTvSeries
);

export const selectStatsEntity = createSelector(
  getUserModuleEntity, (state: UserState) => state.stats
);

export const getAuthError = createSelector(
  selectAuthEntity,
  fromAuth.getAuthError
);

export const getLoggedUser = createSelector(
  selectAuthEntity,
  fromAuth.getLoggedUser
);

export const getAuthState = createSelector(
  selectAuthEntity,
  fromAuth.getAuthState
);

export const getChangePasswordError = createSelector(
  selectAuthEntity,
  fromAuth.getChangePasswordError
);

export const getNotifications = createSelector(
  selectNotificationEntity,
  fromNotification.getNotifications
);

export const getUserFavouriteTvSeries = createSelector(
  selectUserTvSeriesEntity,
  fromUserTvSeries.getFavouriteTvSeries
);

export const getLastWatchedEpisodes = createSelector(
  selectUserTvSeriesEntity,
  fromUserTvSeries.getLastWatchedEpisodes
);

export const getPropositions = createSelector(
  selectUserTvSeriesEntity,
  fromUserTvSeries.getPropositions
);

export const getUserStats = createSelector(
  selectStatsEntity,
  fromStats.getStates
);
