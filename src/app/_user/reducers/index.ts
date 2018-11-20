import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../reducers';

export interface UserState {
  auth: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  auth: fromAuth.reducer
};


const getUserState = createFeatureSelector<UserState>('user');

export const getAuthError = createSelector(
  getUserState,
  state => state.auth.errorMessage
);

export const getLoggedUser = createSelector(
  getUserState,
  state => state.auth.loggedUser
);

export const getAuthState = createSelector(
  getUserState,
  state => state.auth.isAuthenticated
);
