import { ActionReducerMap } from '@ngrx/store';
import * as fromSpinner from '../../app/_shared/reducers/spinner';
import * as fromModal from '../../app/_shared/reducers/modal';
import * as fromNotification from '../../app/_shared/reducers/notification';

export interface State {
  spinner: fromSpinner.State;
  modal: fromModal.State;
  notifications: fromNotification.State;
}

export const reducers: ActionReducerMap<State> = {
  spinner: fromSpinner.reducer,
  modal: fromModal.reducer,
  notifications: fromNotification.reducer
};

