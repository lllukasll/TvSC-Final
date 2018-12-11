import { Component, OnInit, Input } from '@angular/core';
import { INotification } from '../../../models/notification';
import * as moment from 'moment';
import { IUserWatchedEpisodes } from '../../../models/episodes';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() notifications: INotification[];
  @Input() lastWatchedEpisodes: IUserWatchedEpisodes[];

  getTime(notification: INotification) {
    moment.locale('pl');

    return moment(notification.createDateTime).startOf('minute').fromNow();
  }

  constructor() { }

  ngOnInit() {
  }

}
