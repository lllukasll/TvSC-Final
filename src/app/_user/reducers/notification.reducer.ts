import * as NotificationActions from '../actions/notification.actions';
import { INotification } from '../models/notification';

export interface NotificationState {
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: []
};

export const getNotifications = (state: NotificationState) => state.notifications;

export function reducer(state = initialState, notificationAction: NotificationActions.All): NotificationState {
  switch (notificationAction.type) {
    case NotificationActions.NotificationActionTypes.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: notificationAction.notifications
      };
    }
    default: {
      return state;
    }
  }
}
