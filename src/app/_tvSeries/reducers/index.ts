import * as fromRoot from '../../reducers';
import * as fromTvSeries from './tvSeries.reducer';
import * as fromEpisodes from './episodes.reducer';
import * as fromComments from './comments.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TvSeriesModuleState {
  tvSeries: fromTvSeries.TvSeriesState;
  episodes: fromEpisodes.EpisodeState;
  comments: fromComments.CommentsState;
}

export interface State extends fromRoot.State {
  tvSeriesModule: TvSeriesModuleState;
}

export const reducers = {
  tvSeries: fromTvSeries.reducer,
  episodes: fromEpisodes.reducer,
  comments: fromComments.reducer
};

export const selectTvSeriesModuleEntity = createFeatureSelector<TvSeriesModuleState>(
  'tvSeriesModule'
);

export const selectTvSeriesEntity = createSelector(
  selectTvSeriesModuleEntity, (state: TvSeriesModuleState) => state.tvSeries
);

export const selectEpisodesEntity = createSelector(
  selectTvSeriesModuleEntity, (state: TvSeriesModuleState) => state.episodes
);

export const selectCommentsEntity = createSelector(
  selectTvSeriesModuleEntity, (state: TvSeriesModuleState) => state.comments
);

export const getTvSeries = createSelector(
  selectTvSeriesEntity,
  fromTvSeries.getTvSeries
);

export const getCurrentTvSeries = createSelector(
  selectTvSeriesEntity,
  fromTvSeries.getCurrentTvSeries
);

export const getCurrentMonthEpisodes = createSelector(
  selectTvSeriesEntity,
  fromTvSeries.getCurrentMonthEpisodes
);

export const getCurrentWeekEpisodes = createSelector(
  selectTvSeriesEntity,
  fromTvSeries.getCurrentWeekEpisodes
);

export const getClosestEpisode = createSelector(
  selectTvSeriesEntity,
  fromTvSeries.getClosestEpisode
);

export const getWatchedEpisodes = createSelector(
  selectEpisodesEntity,
  fromEpisodes.getWatchedEpisodes
);

export const getEpisodes = createSelector(
  selectEpisodesEntity,
  fromEpisodes.getEpisodes
);

export const getEpisodesLoadingState = createSelector(
  selectEpisodesEntity,
  fromEpisodes.getEpisodesLoading
);

export const getCommentsLoadingState = createSelector(
  selectCommentsEntity,
  fromComments.getLoadingState
);

export const getComments = createSelector(
  selectCommentsEntity,
  fromComments.getComments
);

export const getAddCommentError =  createSelector(
  selectCommentsEntity,
  fromComments.getAddCommentError
);

export const getUpdateCommentError = createSelector(
  selectCommentsEntity,
  fromComments.getEditCommentError
);

export const getDeleteCommentError = createSelector(
  selectCommentsEntity,
  fromComments.getDeleteCommentError
);
