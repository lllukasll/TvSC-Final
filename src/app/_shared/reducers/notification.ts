import { NotificationActionTypes, NotificationActions } from '../actions/notification';
import { INotification } from '../models/notification';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  notificationArray: INotification[];
}

const initialState: State = {
  notificationArray: []
};

export function reducer(state: State = initialState, action: NotificationActions) {
  switch (action.type) {
    case NotificationActionTypes.ADD_NOTIFICATION:
    console.log(...state.notificationArray)
      const tmpNotifications = [...state.notificationArray];
      let id = 0;
      tmpNotifications.forEach(notification => {
        if (notification.id > id) {
          id = notification.id;
        }
      });

      return {
        ...state,
        notificationArray: [...state.notificationArray, {id: id + 1 , content: action.notificationText}]
        };
    case NotificationActionTypes.REMOVE_NOTIFICATION:
      const tmpNotification = [...state.notificationArray];

      tmpNotification.splice(
        tmpNotification.indexOf(tmpNotification.find(x => x.id === action.notificationId)), 1);

      return {
        ...state,
        notificationArray: [...tmpNotification]
      };
    default:
      return state;
  }
}

export const notifications = (state: State) => state.notificationArray;
