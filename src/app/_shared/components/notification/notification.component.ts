import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RemoveNotification } from '../../actions/notification';
import * as fromRoot from '../../../reducers';
import { INotification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() removeNotificationFunction: Function;
  @Input() notification: INotification;
  removing: boolean = false;
  time = 5000;
  width = 100;
  interval;

  constructor(private store: Store<fromRoot.State>) { }

  onClick(notificationId: number): void {
    this.removing = true;
    this.delay(600).then(() => this.store.dispatch(new RemoveNotification(notificationId)));
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  onMouseOver() {
    clearInterval(this.interval);
  }

  onMouseOut() {
    console.log('asdasdasdas')
    const i = this.time / 100;
    this.interval = setInterval(() => {
      if (this.width <= 0) {
        this.removing = true;
        this.time = this.time - i;
        this.delay(600).then(() => this.store.dispatch(new RemoveNotification(this.notification.id)));
        clearInterval(this.interval);
      }
      this.width = this.width - 1;
    }, i);
  }

  ngOnInit() {
    const i = this.time / 100;
    this.interval = setInterval(() => {
      if (this.width <= 0) {
        this.removing = true;
        this.time = this.time - i;
        this.delay(600).then(() => this.store.dispatch(new RemoveNotification(this.notification.id)));
        clearInterval(this.interval);
      }
      this.width = this.width - 1;
    }, i);
  }

}
