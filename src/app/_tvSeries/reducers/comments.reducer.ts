import * as CommentActions from '../actions/comments.actions';
import { IComment } from '../models/comment';

export interface CommentsState {
  comments: IComment[];
  loading: boolean;
  addCommentError: string;
  editCommentError: string;
  deleteCommentError: string;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  addCommentError: null,
  editCommentError: null,
  deleteCommentError: null
};

export const getLoadingState = (state: CommentsState) => state.loading;
export const getComments = (state: CommentsState) => state.comments;
export const getAddCommentError = (state: CommentsState) => state.addCommentError;
export const getEditCommentError = (state: CommentsState) => state.editCommentError;
export const getDeleteCommentError = (state: CommentsState) => state.deleteCommentError;

export function reducer(state = initialState, commentsAction: CommentActions.All): CommentsState {
  switch (commentsAction.type) {
    case CommentActions.CommentsActionTypes.GET_TV_SERIES_COMMENTS: {
      return {
        ...state,
        loading: true
      };
    }
    case CommentActions.CommentsActionTypes.GET_TV_SERIES_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        comments: commentsAction.comments
      };
    }
    case CommentActions.CommentsActionTypes.GET_TV_SERIES_COMMENTS_FAILURE: {
      return {
        ...state,
        loading: false
      };
    }
    case CommentActions.CommentsActionTypes.ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentError: commentsAction.payload
      };
    }
    case CommentActions.CommentsActionTypes.ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        addCommentError: null
      };
    }
    case CommentActions.CommentsActionTypes.UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        editCommentError: null
      };
    }
    case CommentActions.CommentsActionTypes.UPDATE_COMMENT_FAILURE: {
      return {
        ...state,
        editCommentError: commentsAction.payload
      };
    }
    case CommentActions.CommentsActionTypes.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        deleteCommentError: null
      };
    }
    case CommentActions.CommentsActionTypes.DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        deleteCommentError: commentsAction.payload
      };
    }
    default: {
      return state;
    }
  }
}
