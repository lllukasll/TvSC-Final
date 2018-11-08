import { ActionReducerMap } from '@ngrx/store';

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
