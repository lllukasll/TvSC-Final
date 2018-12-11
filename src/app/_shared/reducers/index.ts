import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSpinner from './spinner';
import * as fromModal from './modal';
import * as fromNotification from './notification';

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

export const selectNotificationEntity = createFeatureSelector<fromNotification.State>(
  'notifications'
);

export const getNotifications = createSelector(
  selectNotificationEntity,
  fromNotification.notifications
);

export const isLoginModalOpened = createSelector(
  selectModalEntity,
  fromModal.loginModalOpened
);

export const isRegisterModalOpened = createSelector(
  selectModalEntity,
  fromModal.registerModalOpened
);

export const isCommentModalOpened = createSelector(
  selectModalEntity,
  fromModal.commentModalOpened
);

export const isConfirmModalOpened = createSelector(
  selectModalEntity,
  fromModal.confirmModalOpened
);

export const isChangePasswordModalOpened = createSelector(
  selectModalEntity,
  fromModal.changePasswordModalOpened
);
