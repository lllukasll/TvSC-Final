import { Component, OnInit, Input } from '@angular/core';
import { INotification } from '../../models/notification';
import * as fromRoot from '../../../reducers';
import * as fromShared from '../../reducers';
import { RemoveNotification } from '../../actions/notification';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationContainerComponent implements OnInit {
  notifications$: INotification[] = [];
  @Input() notifications: INotification[] = [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet enim ...'
    },
    {
      id: 2,
      // tslint:disable-next-line:max-line-length
      content: 'Lorem ipsum dolor sit amet enim... Lorem ipsum dolor sit amet enim... Lorem ipsum dolor sit amet enim...Lorem ipsum dolor sit amet enim... Lorem ipsum dolor sit amet enim...'
    },
  ];

  onClick(notificationId: number): void {
    this.store.dispatch(new RemoveNotification(notificationId));
  }

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromShared.getNotifications)).subscribe(
      notifications => { this.notifications$ = notifications; }
    );
  }

}
