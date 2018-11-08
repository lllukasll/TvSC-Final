import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../../_tvSeries/reducers/tvSeries.reducer';
import * as tvShowsActions from '../../../_tvSeries/actions/tvSeries.actions';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  tvShows$: any[];

  constructor(private store: Store<fromTvSeries.State>) { }

  ngOnInit() {
    this.store.dispatch(new tvShowsActions.LoadTvShowsAction());
    this.store.pipe(select(fromTvSeries.getTvSeries)).subscribe(
      tvShows => { this.tvShows$ = tvShows; }
    );
  }

}
