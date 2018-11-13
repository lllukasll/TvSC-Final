import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../reducers/tvSeries.reducer';
import { Observable } from 'rxjs';
import { isSpinnerShowing } from '../../../_shared/reducers/index';
import * as tvShowsActions from '../../actions/tvSeries.actions';

@Component({
  selector: 'app-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.scss']
})
export class TvSeriesDetailsComponent implements OnInit {
  id: string;
  currentTvShow$: any;
  loading: Observable<boolean>;
  url: 'http://localhost:50388';

  constructor(private store: Store<fromTvSeries.State>, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));
    this.store.dispatch(new tvShowsActions.LoadTvShowAction(this.id));
    this.store.pipe(select(fromTvSeries.getCurrentTvSeries)).subscribe(
      tvShow => { this.currentTvShow$ = tvShow; console.log(tvShow); }
    );
  }

}
