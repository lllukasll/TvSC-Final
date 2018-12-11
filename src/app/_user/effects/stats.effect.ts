import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  StatsActionTypes,
  GetUserStatsAction,
  GetUserStatsSuccessAction,
  GetUserStatsFailureAction
} from '../actions/stats.actions';
import { StatsService } from '../services/stats.service';

@Injectable()
export class StatsEffect {
  constructor(private actions: Actions, private statsService: StatsService, private dataService: DataService) { }

  @Effect()
  GetStats: Observable<Action> = this.actions.pipe(
    ofType(StatsActionTypes.GET_USER_STATS),
    map((action: GetUserStatsAction) => action),
    switchMap(() => this.statsService.getStats().pipe(
      map((stats) => new GetUserStatsSuccessAction(this.dataService.getDto(stats)))
    ))
  );
}
