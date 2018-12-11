import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as fromTvSeries from '../../../reducers/tvSeries.reducer';
import * as episodeActions from '../../../actions/episodes.actions';
import { Store, select } from '@ngrx/store';
import { EpisodesEffect } from '../../../effects/episodes.effects';
import * as fromTvSeriesModule from '../../../reducers';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-tv-series-details-seasons',
  templateUrl: './tv-series-details-seasons.component.html',
  styleUrls: ['./tv-series-details-seasons.component.scss']
})
export class TvSeriesDetailsSeasonsComponent implements OnInit, OnDestroy {

  @Input() seasons: any[];
  episodesArray: any[];
  loading = false;
  episodesWatchedArray: number[];
  componentActive = true;

  constructor(private store: Store<fromTvSeriesModule.State>) {
  }

  ngOnInit() {
    this.store.pipe(select(fromTvSeriesModule.getWatchedEpisodes), takeWhile(() => this.componentActive)).subscribe(
      episodes => {
        this.episodesWatchedArray = episodes;
        console.log(episodes);
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getEpisodes), takeWhile(() => this.componentActive)).subscribe(
      episodes => {
        this.episodesArray = episodes;
        console.log(episodes);
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getEpisodesLoadingState), takeWhile(() => this.componentActive)).subscribe(
      episodesLoading => {
        this.loading = episodesLoading;
      }
    );
  }

  addEpisodeToWatched(episodeId) {
    this.store.dispatch(new episodeActions.AddWatchedEpisodeAction(episodeId));
  }

  removeFromWatched(episodeId) {
    console.log(episodeId);
    this.store.dispatch(new episodeActions.RemoveWatchedEpisodeAction(episodeId));
  }

  addSeasonToWatched(seasonId) {
    this.store.dispatch(new episodeActions.AddWatchedSeasonAction(seasonId));
  }

  removeWatchedSeason(seasonId) {
    this.store.dispatch(new episodeActions.RemoveWatchedSeasonAction(seasonId));
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
