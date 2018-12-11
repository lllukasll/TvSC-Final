import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUserModule from '../../reducers';
import { GetNotificationsAction } from '../../actions/notification.actions';
import { GetFavouriteTvSeriesAction, GetLastWatchedEpisodesAction, GetPropostionsAction } from '../../actions/tvSeries.actions';
import { GetUserStatsAction } from '../../actions/stats.actions';
import { takeWhile } from 'rxjs/operators';
import { INotification } from '../../models/notification';
import { IFavouriteTvSeries } from '../../models/tvSeries';
import { IUserWatchedEpisodes } from '../../models/episodes';
import { IStats } from '../../models/stats';
import { ITvSeriesProposition } from '../../models/tvSeriesProposition';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  informationsActive = true;
  settingsActive = false;
  historyActive = false;
  myFavourite = false;
  componentActive = true;
  notifications: INotification[];
  userFavouriteTvSeries: IFavouriteTvSeries[];
  lastWatchedEpisodes: IUserWatchedEpisodes[];
  propositions: ITvSeriesProposition[];
  loggedUser: any;
  stats: IStats;

  onChange(value: string) {
    if (value === 'informations') {
      this.informationsActive = true;
      this.settingsActive = false;
      this.historyActive = false;
      this.myFavourite = false;
    } else if (value === 'settings') {
      this.informationsActive = false;
      this.settingsActive = true;
      this.historyActive = false;
      this.myFavourite = false;
    } else if (value === 'history') {
      this.informationsActive = false;
      this.settingsActive = false;
      this.historyActive = true;
      this.myFavourite = false;
    } else if (value === 'favourite') {
      this.informationsActive = false;
      this.settingsActive = false;
      this.historyActive = false;
      this.myFavourite = true;
    }
  }

  constructor(private store: Store<fromUserModule.State>) { }

  ngOnInit() {
    this.store.dispatch(new GetNotificationsAction());
    this.store.dispatch(new GetFavouriteTvSeriesAction());
    this.store.dispatch(new GetLastWatchedEpisodesAction(12));
    this.store.dispatch(new GetUserStatsAction());
    this.store.dispatch(new GetPropostionsAction());
    this.store.pipe(select(fromUserModule.getLoggedUser), takeWhile(() => this.componentActive)).subscribe(
      loggedUser => {
        this.loggedUser = loggedUser;
      }
    );
    this.store.pipe(select(fromUserModule.getNotifications), takeWhile(() => this.componentActive)).subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
    this.store.pipe(select(fromUserModule.getUserFavouriteTvSeries), takeWhile(() => this.componentActive)).subscribe(
      favouriteTvSeries => {
        this.userFavouriteTvSeries = favouriteTvSeries;
      }
    );
    this.store.pipe(select(fromUserModule.getLastWatchedEpisodes), takeWhile(() => this.componentActive)).subscribe(
      lastWatchedEpisodes => {
        this.lastWatchedEpisodes = lastWatchedEpisodes;
      }
    );
    this.store.pipe(select(fromUserModule.getUserStats), takeWhile(() => this.componentActive)).subscribe(
      stats => {
        this.stats = stats;
      }
    );
    this.store.pipe(select(fromUserModule.getPropositions), takeWhile(() => this.componentActive)).subscribe(
      propositions => {
        this.propositions = propositions;
      }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
