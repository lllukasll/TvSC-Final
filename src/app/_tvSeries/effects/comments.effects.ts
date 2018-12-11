import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  NotificationAdded
} from '../../_shared/actions/notification';
import {
  CommentsActionTypes,
  AddCommentAction,
  AddCommentSuccessAction,
  AddCommentFailureAction,
  DeleteCommentAction,
  DeleteCommentSuccessAction,
  DeleteCommentFailureAction,
  UpdateCommentAction,
  UpdateCommentFailureAction,
  UpdateCommentSuccessAction,
  GetTvSeriesCommentsAction,
  GetTvSeriesCommentsfailureAction,
  GetTvSeriesCommentsSuccessAction
} from '../actions/comments.actions';
import { CommentsService } from '../services/comments.service';
import {
  CloseModal
} from '../../_shared/actions/modal';

@Injectable()
export class CommentsEffect {
  constructor(private actions: Actions, private commentsService: CommentsService, private dataService: DataService) { }

  @Effect()
  GetTvSeriesComments: Observable<Action> = this.actions.pipe(
    ofType(CommentsActionTypes.GET_TV_SERIES_COMMENTS),
    map((action: GetTvSeriesCommentsAction) => action.tvSeriesId),
    switchMap((tvSeriesId) => this.commentsService.getTvSeriesComments(tvSeriesId).pipe(
      map((comments) => new GetTvSeriesCommentsSuccessAction(this.dataService.getDto(comments)))
    ))
  );

  @Effect()
  AddComment: Observable<Action> = this.actions.pipe(
    ofType(CommentsActionTypes.ADD_COMMENT),
    map((action: AddCommentAction) => action),
    switchMap(action => {
      return this.commentsService.addComment(action.content, action.tvSeriesId).pipe(
        switchMap(() => [
          new AddCommentSuccessAction(action.content),
          new NotificationAdded('Pomyślnie dodano komentarz'),
          new CloseModal(),
          new GetTvSeriesCommentsAction(action.tvSeriesId),
        ]),
        catchError((error) => [
          new AddCommentFailureAction(this.dataService.getErrorAsString(error))
        ])
      );
    })
  );

  @Effect()
  UpdateComment: Observable<Action> = this.actions.pipe(
    ofType(CommentsActionTypes.UPDATE_COMMENT),
    map((action: UpdateCommentAction) => action),
    switchMap(action => {
      return this.commentsService.updateComment(action.content, action.commentId).pipe(
        switchMap(() => [
          new UpdateCommentSuccessAction(),
          new NotificationAdded('Pomyślnie edytowano komentarz'),
          new CloseModal(),
          new GetTvSeriesCommentsAction(action.tvSeriesId)
        ]),
        catchError((error) => [
          new UpdateCommentFailureAction(this.dataService.getErrorAsString(error))
        ])
      );
    })
  );

  @Effect()
  DeleteComment: Observable<Action> = this.actions.pipe(
    ofType(CommentsActionTypes.DELETE_COMMENT),
    map((action: DeleteCommentAction) => action),
    switchMap(action => {
      return this.commentsService.deleteComment(action.commentId).pipe(
        switchMap(() => [
          new DeleteCommentSuccessAction(action.commentId),
          new NotificationAdded('Pomyślnie usunięto komentarz'),
          new CloseModal(),
          new GetTvSeriesCommentsAction(action.tvSeriesId)
        ]),
        catchError((error) => [
          new DeleteCommentFailureAction(this.dataService.getErrorAsString(error))
        ])
      )
    })
  );
}
