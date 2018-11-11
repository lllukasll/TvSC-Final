import { ActionReducerMap } from '@ngrx/store';
import * as fromSpinner from '../../app/_shared/reducers/spinner';

export interface State {
  spinner: fromSpinner.State;
}

export const reducers: ActionReducerMap<State> = {
  spinner: fromSpinner.reducer
};

