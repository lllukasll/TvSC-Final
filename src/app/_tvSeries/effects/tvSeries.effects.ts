import { Actions, Effect, ofType } from '@ngrx/effects';
import { TvSeriesService } from '../services/tvSeries.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  TvSeriesActionTypes,
  LoadTvShowsAction,
  LoadTvShowsSuccessAction,
  LoadTvShowAction,
  LoadTvShowSuccessAction,
  GetCurrentMonthEpisodesAction,
  GetCurrentMonthEpisodesSuccessAction,
  GetCurrentWeekEpisodesAction,
  GetCurrentWeekEpisodesSuccessAction,
  AddTvSeriesToFavouriteAction,
  AddTvSeriesToFavouriteSuccessAction,
  RemoveTvSeriesFromFavourites,
  RemoveTvSeriesFromFavouritesSuccess,
  AddTvSeriesRatingAction,
  AddTvSeriesRatingSuccessAction,
  AddTvSeriesRatingFailureAction,
  UpdateTvSeriesRatingAction,
  UpdateTvSeriesRatingSuccessAction,
  GetTvSeriesClosestEpisodeAction,
  GetTvSeriesClosestEpisodeSuccessAction,
  GetTvSeriesClosestEpisodeFailureAction} from '../actions/tvSeries.actions';
import {
    NotificationAdded
  } from '../../_shared/actions/notification';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HideSpinner, ShowSpinner } from '../../_shared/actions/spinner';
import { DataService } from '../../services/data.service';

type showSpinnerTypes =
  | LoadTvShowsAction
  | LoadTvShowAction
  | GetCurrentMonthEpisodesAction
  | GetCurrentWeekEpisodesAction;

const showSpinnerActions = [
  TvSeriesActionTypes.GET_ALL,
  TvSeriesActionTypes.GET_ONE,
  TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES,
  TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES
];

type hideSpinnerTypes =
  | LoadTvShowsSuccessAction
  | LoadTvShowSuccessAction
  | GetCurrentMonthEpisodesSuccessAction
  | GetCurrentWeekEpisodesSuccessAction;

const hideSpinnerActions = [
  TvSeriesActionTypes.GET_ALL_SUCCESS,
  TvSeriesActionTypes.GET_ONE_SUCCESS,
  TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES_SUCCESS,
  TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES_SUCCESS
];

@Injectable()
export class TvSeriesEffect  {
  constructor(private actions: Actions, private tvSeriesService: TvSeriesService, private dataService: DataService) { }

  @Effect()
  showSpinner: Observable<Action> = this.actions
    .ofType<showSpinnerTypes>(...showSpinnerActions)
    .pipe(map(() => new ShowSpinner()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions
    .ofType<hideSpinnerTypes>(...hideSpinnerActions)
    .pipe(map(() => new HideSpinner()));

  @Effect()
  GetCurrentMonthEpisodes: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_CURRENT_MONTH_EPISODES),
    map((action: GetCurrentMonthEpisodesAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getCurrentMonthEpisodes(payload)),
    map(episodes => (new GetCurrentMonthEpisodesSuccessAction(episodes.dtoObject)))
  );

  @Effect()
  GetCurrentWeekEpisodes: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_CURRENT_WEEK_EPISODES),
    map((action: GetCurrentWeekEpisodesAction) => action.payload),
    tap(payload => console.log(payload)),
    switchMap((payload) => this.tvSeriesService.getCurrentWeekEpisodes(payload)),
    map(episodes => (new GetCurrentWeekEpisodesSuccessAction(episodes.dtoObject)))
  );

  @Effect()
  GetAll: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ALL),
    map((action: LoadTvShowsAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getAll(payload)),
    map(tvShows => (new LoadTvShowsSuccessAction(tvShows.dtoObject))
  ));

  @Effect()
  GetOne: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_ONE),
    map((action: LoadTvShowAction) => action.payload),
    switchMap((payload) => this.tvSeriesService.getOne(payload)),
    map(tvShow => (new LoadTvShowSuccessAction(tvShow.dtoObject)))
  );

  @Effect()
  AddTvSeriesToFavourite: Observable<any> = this.actions.pipe(
    ofType(TvSeriesActionTypes.ADD_TV_SERIES_TO_FAVOURITE),
    map((action: AddTvSeriesToFavouriteAction) => action.tvSeriesId),
    switchMap(tvSeriesId => {
      return this.tvSeriesService.addToFavourite(tvSeriesId).pipe(
        switchMap(() => [
          new AddTvSeriesToFavouriteSuccessAction(),
          new NotificationAdded('Pomyślnie dodano serial do ulubionych')]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  RemoveTvSeriesFromFavourites: Observable<any> = this.actions.pipe(
    ofType(TvSeriesActionTypes.REMOVE_TV_SERIES_FROM_FAVOURITES),
    map((action: RemoveTvSeriesFromFavourites) => action.tvSeriesId),
    switchMap(tvSeriesId => {
      return this.tvSeriesService.removeFromFavourites(tvSeriesId).pipe(
        switchMap(() =>  [
          new RemoveTvSeriesFromFavouritesSuccess(),
          new NotificationAdded('Pomyślnie usunięto serial z listy ulubionych')]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  AddTvSeriesRating: Observable<any> = this.actions.pipe(
    ofType(TvSeriesActionTypes.ADD_TV_SERIES_RATING),
    map((action: AddTvSeriesRatingAction) => action),
    switchMap(action => {
      return this.tvSeriesService.addTvSeriesRating(action.tvSeriesId, action.tvSeriesRating).pipe(
        switchMap(() => [
          new AddTvSeriesRatingSuccessAction(action.tvSeriesRating),
          new NotificationAdded('Pomyślnie dodano ocenę serialu')
        ]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  UpdateTvSeriesRating: Observable<any> = this.actions.pipe(
    ofType(TvSeriesActionTypes.UPDATE_TV_SERIES_RATING),
    map((action: UpdateTvSeriesRatingAction) => action),
    switchMap(action => {
      return this.tvSeriesService.updateTvSeriesRating(action.ratingId, action.ratingModel).pipe(
        switchMap(() => [
          new UpdateTvSeriesRatingSuccessAction(action.ratingModel),
          new NotificationAdded('Pomyślnie edytowano ocenę serialu')
        ]),
        catchError((error) => {
          return of(new NotificationAdded(this.dataService.getErrorAsString(error)));
        })
      );
    })
  );

  @Effect()
  GetTvSeriesClosestEpisode: Observable<Action> = this.actions.pipe(
    ofType(TvSeriesActionTypes.GET_TV_SERIES_CLOSEST_EPISODE),
    map((action: GetTvSeriesClosestEpisodeAction) => action),
    switchMap((action) => this.tvSeriesService.getTvSeriesClosestEpisode(action.tvSeriesId)),
    map(episode => (new GetTvSeriesClosestEpisodeSuccessAction(this.dataService.getDto(episode)))),
    catchError(error => of(new GetTvSeriesClosestEpisodeFailureAction(this.dataService.getErrors(error))))
  );
}
