import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  EpisodesActionTypes,
  AddWatchedEpisodeAction,
  AddWatchedEpisodeFailureAction,
  AddWatchedEpisodeSuccessAction,
  RemoveWatchedEpisodeAction,
  RemoveWatchedEpisodeSuccessAction,
  RemoveWatchedEpisodeFailureAction,
  AddWatchedSeasonAction,
  AddWatchedSeasonFailureAction,
  AddWatchedSeasonSuccessAction,
  RemoveWatchedSeasonAction,
  RemoveWatchedSeasonFailureAction,
  RemoveWatchedSeasonSuccessAction,
  GetTvSeriesEpisodesAction,
  GetTvSeriesEpisodesFailureAction,
  GetTvSeriesEpisodesSuccessAction
} from '../actions/episodes.actions';
import {
  NotificationAdded
} from '../../_shared/actions/notification';
import { EpisodeService } from '../services/episode.service';

@Injectable()
export class EpisodesEffect {
  constructor(private actions: Actions, private episodeService: EpisodeService, private dataService: DataService) { }

  @Effect()
  GetTvSeriesEpisodes: Observable<Action> = this.actions.pipe(
    ofType(EpisodesActionTypes.GET_TV_SERIES_EPISODES),
    map((action: GetTvSeriesEpisodesAction) => action.tvSeriesId),
    switchMap((tvSeriesId) => this.episodeService.getTvSeriesEpisodes(tvSeriesId).pipe(
      map((episodes) => new GetTvSeriesEpisodesSuccessAction(this.dataService.getDto(episodes)))
    )),
  );

  @Effect()
  AddWatchedEpisode: Observable<Action> = this.actions.pipe(
    ofType(EpisodesActionTypes.ADD_WATCHED_EPISODE),
    map((action: AddWatchedEpisodeAction) => action.episodeId),
    switchMap(episodeId => {
      return this.episodeService.addEpisodeToWatched(episodeId).pipe(
        switchMap(() => [
          new AddWatchedEpisodeSuccessAction(episodeId),
          new NotificationAdded('Pomyślnie dodano odcinek do obejrzanych')]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  RemoveWatchedEpisode: Observable<Action> = this.actions.pipe(
    ofType(EpisodesActionTypes.REMOVE_WATCHED_EPISODE),
    map((action: RemoveWatchedEpisodeAction) => action.episodeId),
    switchMap(episodeId => {
      return this.episodeService.removeWatchedEpisode(episodeId).pipe(
        switchMap(() => [
          new RemoveWatchedEpisodeSuccessAction(episodeId),
          new NotificationAdded('Pomyślnie usunięto odcinek z listy obejrzanych')
        ]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  AddSeasonToWatched: Observable<Action> = this.actions.pipe(
    ofType(EpisodesActionTypes.ADD_WATCHED_SEASON),
    map((action: AddWatchedSeasonAction) => action.seasonId),
    switchMap(seasonId => {
      return this.episodeService.addWatchedSeason(seasonId).pipe(
        switchMap(() => [
          new AddWatchedSeasonSuccessAction(seasonId),
          new NotificationAdded('Pomyślnie oznaczono sezon jako obejrzany')
        ]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  MarkSeasonAsNotWatched: Observable<any> = this.actions.pipe(
    ofType(EpisodesActionTypes.REMOVE_WATCHED_SEASON),
    map((action: RemoveWatchedSeasonAction) => action.seasonId),
    switchMap(seasonId => {
      return this.episodeService.removeWatchedSeason(seasonId).pipe(
        switchMap(() => [
          new RemoveWatchedSeasonSuccessAction(seasonId),
          new NotificationAdded('Pomyślnie usunięto sezon z obejrzanych')
        ]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );
}
