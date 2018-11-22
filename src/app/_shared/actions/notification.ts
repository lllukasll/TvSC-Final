import { Action } from '@ngrx/store';
import { INotification } from '../models/notification';

export enum NotificationActionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
}

export class NotificationAdded implements Action {
  readonly type = NotificationActionTypes.ADD_NOTIFICATION;
  constructor (public notificationText: string) { }
}

export class RemoveNotification implements Action {
  readonly type = NotificationActionTypes.REMOVE_NOTIFICATION;
  constructor (public notificationId: number) { }
}

export type NotificationActions
  = NotificationAdded
  | RemoveNotification;
