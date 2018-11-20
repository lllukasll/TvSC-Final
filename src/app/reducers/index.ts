import { ActionReducerMap } from '@ngrx/store';
import * as fromSpinner from '../../app/_shared/reducers/spinner';
import * as fromModal from '../../app/_shared/reducers/modal';

export interface State {
  spinner: fromSpinner.State;
  modal: fromModal.State;
}

export const reducers: ActionReducerMap<State> = {
  spinner: fromSpinner.reducer,
  modal: fromModal.reducer
};

