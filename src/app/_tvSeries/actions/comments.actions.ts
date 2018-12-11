import { Action } from '@ngrx/store';
import { IComment } from '../models/comment';

export enum CommentsActionTypes {
  ADD_COMMENT = '[Comment] ADD_COMMENT',
  ADD_COMMENT_SUCCESS = '[Comment] ADD_COMMENT_SUCCESS',
  ADD_COMMENT_FAILURE = '[Comment] ADD_COMMENT_FAILURE',
  DELETE_COMMENT = '[Comment] DELETE_COMMENT',
  DELETE_COMMENT_SUCCESS = '[Comment] DELETE_COMMENT_SUCCESS',
  DELETE_COMMENT_FAILURE = '[Commnet] DELETE_COMMENT_FAILURE',
  GET_TV_SERIES_COMMENTS = '[Comment] GET_TV_SERIES_COMMENTS',
  GET_TV_SERIES_COMMENTS_SUCCESS = '[Comment] GET_TV_SERIES_COMMENTS_SUCCESS',
  GET_TV_SERIES_COMMENTS_FAILURE = '[Comment] GET_TV_SERIES_COMMENTS_FAILURE',
  UPDATE_COMMENT = '[Comment] UPDATE_COMMENT',
  UPDATE_COMMENT_SUCCESS = '[Comment] UPDATE_COMMENT_SUCCESS',
  UPDATE_COMMENT_FAILURE = '[Comment] UPDATE_COMMENT_FAILURE'
}

export class AddCommentAction implements Action {
  readonly type = CommentsActionTypes.ADD_COMMENT;
  constructor(public content: any, public tvSeriesId: string) { }
}

export class AddCommentSuccessAction implements Action {
  readonly type = CommentsActionTypes.ADD_COMMENT_SUCCESS;
  constructor(public content: string) { }
}

export class AddCommentFailureAction implements Action {
  readonly type = CommentsActionTypes.ADD_COMMENT_FAILURE;
  constructor(public payload: any) { }
}

export class DeleteCommentAction implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT;
  constructor(public commentId: number, public tvSeriesId: string) { }
}

export class DeleteCommentSuccessAction implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public commentId: number) { }
}

export class DeleteCommentFailureAction implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT_FAILURE;
  constructor(public payload: any) { }
}

export class GetTvSeriesCommentsAction implements Action {
  readonly type = CommentsActionTypes.GET_TV_SERIES_COMMENTS;
  constructor(public tvSeriesId: string) { }
}

export class GetTvSeriesCommentsSuccessAction implements Action {
  readonly type = CommentsActionTypes.GET_TV_SERIES_COMMENTS_SUCCESS;
  constructor(public comments: IComment[]) { }
}

export class GetTvSeriesCommentsfailureAction implements Action {
  readonly type = CommentsActionTypes.GET_TV_SERIES_COMMENTS_FAILURE;
  constructor(public payload: any) { }
}

export class UpdateCommentAction implements Action {
  readonly type = CommentsActionTypes.UPDATE_COMMENT;
  constructor(public content: any, public commentId: number, public tvSeriesId: string) { }
}

export class UpdateCommentSuccessAction implements Action {
  readonly type = CommentsActionTypes.UPDATE_COMMENT_SUCCESS;
  constructor() { }
}

export class UpdateCommentFailureAction implements Action {
  readonly type = CommentsActionTypes.UPDATE_COMMENT_FAILURE;
  constructor(public payload: any) { }
}

export type All = AddCommentAction
  | AddCommentSuccessAction
  | AddCommentFailureAction
  | DeleteCommentAction
  | DeleteCommentSuccessAction
  | DeleteCommentFailureAction
  | GetTvSeriesCommentsAction
  | GetTvSeriesCommentsSuccessAction
  | GetTvSeriesCommentsfailureAction
  | UpdateCommentAction
  | UpdateCommentSuccessAction
  | UpdateCommentFailureAction;
