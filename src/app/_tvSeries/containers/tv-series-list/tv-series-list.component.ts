import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as tvShowsActions from '../../actions/tvSeries.actions';
import * as fromTvSeries from '../../reducers/tvSeries.reducer';
import { isSpinnerShowing } from '../../../_shared/reducers/index';
import { State } from '../../../reducers';
import { TvShow } from '../../models/tvShow';

@Component({
  selector: 'app-tv-series-list',
  templateUrl: './tv-series-list.component.html',
  styleUrls: ['./tv-series-list.component.scss']
})
export class TvSeriesListComponent implements OnInit, OnDestroy {

  url: 'http://localhost:50388';
  tvShows$: any[];
  loading: Observable<boolean>;
  parameters: {
    categories: string[],
    networks: string[],
    pageNumber: number,
    pageSize: number,
    status: number
  };

  private subscription: any;

  constructor(private store: Store<fromTvSeries.State>) {
    this.parameters = {
      categories: [],
      networks: [],
      pageNumber: 1,
      pageSize: 5,
      status: 0
    };
  }

  filterSubmitted(event): void {
    this.parameters.categories = event.categories;
    this.parameters.networks = event.networks;
    this.parameters.status = event.status;
    this.parameters.pageNumber = 1;
    this.store.dispatch(new tvShowsActions.LoadTvShowsAction(this.parameters));
  }

  pageChanged(event): void {
    console.log(event);
    this.parameters.pageNumber = event;
    this.store.dispatch(new tvShowsActions.LoadTvShowsAction(this.parameters));
  }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));
    this.store.dispatch(new tvShowsActions.LoadTvShowsAction(this.parameters));
    this.subscription = this.store.pipe(select(fromTvSeries.getTvSeries)).subscribe(
      tvShows => { this.tvShows$ = tvShows; console.log(tvShows); }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
