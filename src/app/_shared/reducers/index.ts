import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSpinner from './spinner';
import * as fromModal from './modal';

export const selectSpinnerEntity = createFeatureSelector<fromSpinner.State>(
  'spinner'
);
export const isSpinnerShowing = createSelector(
  selectSpinnerEntity,
  fromSpinner.isShowing
);

export const selectModalEntity = createFeatureSelector<fromModal.State>(
  'modal'
);

export const isLoginModalOpened = createSelector(
  selectModalEntity,
  fromModal.loginModalOpened
);

export const isRegisterModalOpened = createSelector(
  selectModalEntity,
  fromModal.registerModalOpened
);
