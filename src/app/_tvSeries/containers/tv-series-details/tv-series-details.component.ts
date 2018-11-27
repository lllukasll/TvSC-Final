import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../reducers/tvSeries.reducer';
import { Observable } from 'rxjs';
import { isSpinnerShowing } from '../../../_shared/reducers/index';
import * as tvShowsActions from '../../actions/tvSeries.actions';
import { IRatingModel } from '../../../_shared/models/rating';
import { take, takeWhile } from 'rxjs/operators';
import { IEpisode } from '../../models/episode';

@Component({
  selector: 'app-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.scss']
})
export class TvSeriesDetailsComponent implements OnInit, OnDestroy {
  id: string;
  currentTvShow$: any;
  closestEpisode$: IEpisode;
  loading: Observable<boolean>;
  url: 'http://localhost:50388';
  ratingModel: IRatingModel[] = [{
    name: 'Fabuła',
    value: 0
  }, {
    name: 'Muzyka',
    value: 0
  }, {
    name: 'Efekty',
    value: 0
  }];
  componentActive = true;

  tvShowObservable$: any;

  constructor(private store: Store<fromTvSeries.State>, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  addToFavouriteClick() {
    this.store.dispatch(new tvShowsActions.AddTvSeriesToFavouriteAction(this.id));
  }

  removeFromFavouritesClick() {
    this.store.dispatch(new tvShowsActions.RemoveTvSeriesFromFavourites(this.id));
  }

  addRating(ratingModel) {
    const ratingToSend = {
      story: ratingModel[0].value,
      music: ratingModel[1].value,
      effects: ratingModel[2].value
    };

    this.store.dispatch(new tvShowsActions.AddTvSeriesRatingAction(ratingToSend, this.id));
  }

  updateRating(ratingModel) {
    const ratingToSend = {
      story: ratingModel[0].value,
      music: ratingModel[1].value,
      effects: ratingModel[2].value
    };

    this.store.dispatch(new tvShowsActions.UpdateTvSeriesRatingAction(this.currentTvShow$.userRatingDto.id, ratingToSend));
  }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));
    this.store.dispatch(new tvShowsActions.LoadTvShowAction(this.id));
    this.store.pipe(select(fromTvSeries.getCurrentTvSeries), takeWhile(() => this.componentActive)).subscribe(
      tvShow => {
        this.currentTvShow$ = tvShow;
        console.log(tvShow);
        this.ratingModel[0].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.story : 0;
        this.ratingModel[1].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.music : 0;
        this.ratingModel[2].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.effects : 0; }
    );

    this.store.dispatch(new tvShowsActions.GetTvSeriesClosestEpisodeAction(this.id));
    this.store.pipe(select(fromTvSeries.getClosestEpisode), takeWhile(() => this.componentActive)).subscribe(
      episode => {
        this.closestEpisode$ = episode;
      }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
