import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  NotificationActionTypes,
  GetNotificationsAction,
  GetNotificationsFailureAction,
  GetNotificationsSuccessAction
} from '../actions/notification.actions';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationEffect {
  constructor(private actions: Actions, private notificationService: NotificationService, private dataService: DataService) { }

  @Effect()
  GetNotifications: Observable<Action> = this.actions.pipe(
    ofType(NotificationActionTypes.GET_NOTIFICATIONS),
    map((action: GetNotificationsAction) => action),
    switchMap(() => this.notificationService.getNotifications().pipe(
      map((notifications) => new GetNotificationsSuccessAction(this.dataService.getDto(notifications)))
    ))
  );
}
