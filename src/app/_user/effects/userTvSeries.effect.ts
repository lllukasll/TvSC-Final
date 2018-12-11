import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  TvSeriesActionTypes,
  GetFavouriteTvSeriesAction,
  GetFavouriteTvSeriesFailreAction,
  GetFavouriteTvSeriesSuccessAction,
  GetLastWatchedEpisodesAction,
  GetLastWatchedEpisodesSuccessAction,
  GetPropostionsAction,
  GetPropostionsSuccessAction
} from '../actions/tvSeries.actions';
import { UserTvSeriesService } from '../services/userTvSeries.service';

@Injectable()
export class UserTvSeriesEffect {
  constructor(private actions: Actions, private userTvSeriesService: UserTvSeriesService, private dataService: DataService) { }

  @Effect()
  GetUserFavouriteTvSeries: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_FAVOURITE_TV_SERIES),
    map((action: GetFavouriteTvSeriesAction) => action),
    switchMap(() => this.userTvSeriesService.getUserFavouriteTvSeries().pipe(
      map((tvSeries) => new GetFavouriteTvSeriesSuccessAction(this.dataService.getDto(tvSeries)))
    ))
  );

  @Effect()
  GetLastWatchedEpisodes: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_LAST_WATCHED_EPISODES),
    map((action: GetLastWatchedEpisodesAction) => action),
    switchMap((action) => this.userTvSeriesService.getLastWatchedEpisodes(action.numberOfEpisodes).pipe(
      map((episodes) => new GetLastWatchedEpisodesSuccessAction(this.dataService.getDto(episodes)))
    ))
  );

  @Effect()
  GetPropositions: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_PROPOSITIONS),
    map((action: GetPropostionsAction) => action),
    switchMap((action) => this.userTvSeriesService.getPropositions().pipe(
      map((tvShows) => new GetPropostionsSuccessAction(this.dataService.getDto(tvShows)))
    ))
  );
}
