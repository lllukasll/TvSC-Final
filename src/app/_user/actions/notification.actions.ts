import { Action } from '@ngrx/store';
import { INotification } from '../../_shared/models/notification';

export enum NotificationActionTypes {
  GET_NOTIFICATIONS = '[Notification] GET_NOTIFICATION',
  GET_NOTIFICATIONS_SUCCESS = '[Notification] GET_NOTIFICATIONS_SUCCESS',
  GET_NOTIFICATIONS_FAILURE = '[Notification] GET_NOTIFICATIONS_FAILURE'
}

export class GetNotificationsAction implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS;
  constructor() { }
}

export class GetNotificationsSuccessAction implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS_SUCCESS;
  constructor(public notifications: any[]) { }
}

export class GetNotificationsFailureAction implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | GetNotificationsAction
  | GetNotificationsSuccessAction
  | GetNotificationsFailureAction;
