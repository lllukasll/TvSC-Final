import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../../_tvSeries/reducers/tvSeries.reducer';
import * as tvShowsActions from '../../../_tvSeries/actions/tvSeries.actions';
import * as fromUserModule from '../../../_user/reducers';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  componentActive = true;
  activePart = 'tvSeries';
  loggedUser: any;

  constructor(private store: Store<fromUserModule.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromUserModule.getLoggedUser), takeWhile(() => this.componentActive)).subscribe(
      loggedUser => {
        this.loggedUser = loggedUser;
      }
    );
  }

  onChange(value: string) {
    this.activePart = value;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
