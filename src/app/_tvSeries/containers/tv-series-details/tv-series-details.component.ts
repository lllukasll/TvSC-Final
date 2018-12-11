import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../reducers/tvSeries.reducer';
import * as fromTvSeriesModule from '../../reducers';
import * as fromShared from '../../../_shared/reducers';
import { CloseModal, CommentModalOpen, ConfirmModalOpen } from '../../../_shared/actions/modal';
import { Observable } from 'rxjs';
import { isSpinnerShowing } from '../../../_shared/reducers/index';
import * as tvShowsActions from '../../actions/tvSeries.actions';
import * as episodeActions from '../../actions/episodes.actions';
import * as commentsAction from '../../actions/comments.actions';
import { AddCommentAction, UpdateCommentAction } from '../../actions/comments.actions';
import { IRatingModel } from '../../../_shared/models/rating';
import { take, takeWhile } from 'rxjs/operators';
import { IEpisode } from '../../models/episode';
import FormModel from '../../../_shared/models/formModel';
import { IComment } from '../../models/comment';

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
  episodesActive = true;
  actorsActive = false;
  galleryActive = false;
  informationActive = false;
  loadingComments = false;
  addCommentOpened = false;
  addCommentError: string;
  commentFormSettings: FormModel[] = [
    { label: '', placeholder: 'Podaj treść komentarza...', type: 'textarea', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 10, maxLength: 250, required: true
        }, listElements: []
    }
  ];
  editingCommentState = false;
  editingComment = null;
  editCommentError: string;
  deleteCommentState = false;
  deletingComment = null;
  deleteCommentError: string;


  constructor(private store: Store<fromTvSeriesModule.State>, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  toogleDeleteComment() {
    if (this.deleteCommentState) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new ConfirmModalOpen()));
    }

    this.deletingComment = null;
  }

  toogleAddComment(): void {
    this.delay(100).then(() => {
      this.editingCommentState = false;
      this.commentFormSettings = [
        { label: '', placeholder: 'Podaj treść komentarza...', type: 'textarea', mode: 'input', initialValue: null,
            validationSettings: {
                minLength: 10, maxLength: 250, required: true
            }, listElements: []
        }
      ];
    });

    if (this.addCommentOpened) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new CommentModalOpen()));
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  onEditClicked(comment: IComment) {
    this.commentFormSettings = [
      { label: '', placeholder: 'Podaj treść komentarza...', type: 'textarea', mode: 'input', initialValue: comment.content,
          validationSettings: {
              minLength: 10, maxLength: 250, required: true
          }, listElements: []
      }
    ];

    if (this.addCommentOpened) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new CommentModalOpen()));
    }

    this.editingCommentState = true;
    this.editingComment = comment;
  }

  onEditCommentSubmit = (commentForm: any) => {
    const payload = {
      content: commentForm[0].value,
    };

    console.log(payload);
    this.store.dispatch(new UpdateCommentAction(payload, this.editingComment.id, this.id));
    this.editingCommentState = false;
    this.editingComment = null;
  }

  onDeleteCommentClicked = (comment: IComment) => {
    this.deletingComment = comment;
    if (this.deleteCommentState) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new ConfirmModalOpen()));
    }
  }

  onDeleteCommentSubmit = () => {
    this.store.dispatch(new commentsAction.DeleteCommentAction(this.deletingComment.id, this.id));
    this.deleteCommentState = false;
    this.deletingComment = null;
  }

  submitAddComment = (commentForm: any) => {
    const payload = {
      content: commentForm[0].value,
    };

    this.store.dispatch(new AddCommentAction(payload, this.id));
  }

  onChangeCategoryClick(value: string) {
    if (value === 'episodes') {
      this.episodesActive = true;
      this.actorsActive = false;
      this.galleryActive = false;
      this.informationActive = false;
    } else if (value === 'actors') {
      this.episodesActive = false;
      this.actorsActive = true;
      this.galleryActive = false;
      this.informationActive = false;
    } else if (value === 'gallery') {
      this.episodesActive = false;
      this.actorsActive = false;
      this.galleryActive = true;
      this.informationActive = false;
    } else if (value === 'informations') {
      this.episodesActive = false;
      this.actorsActive = false;
      this.galleryActive = false;
      this.informationActive = true;
    }
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
    this.store.dispatch(new episodeActions.GetTvSeriesEpisodesAction(this.id));
    this.store.dispatch(new tvShowsActions.GetTvSeriesClosestEpisodeAction(this.id));
    this.store.dispatch(new commentsAction.GetTvSeriesCommentsAction(this.id));

    this.store.pipe(select(fromTvSeriesModule.getCurrentTvSeries), takeWhile(() => this.componentActive)).subscribe(
      tvShow => {
        this.currentTvShow$ = tvShow;
        console.log(tvShow);
        this.ratingModel[0].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.story : 0;
        this.ratingModel[1].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.music : 0;
        this.ratingModel[2].value = tvShow && tvShow.userRatingDto ? tvShow.userRatingDto.effects : 0; }
    );

    this.store.pipe(select(fromTvSeriesModule.getClosestEpisode), takeWhile(() => this.componentActive)).subscribe(
      episode => {
        this.closestEpisode$ = episode;
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getCommentsLoadingState), takeWhile(() => this.componentActive)).subscribe(
      loading => {
        this.loadingComments = loading;
      }
    );

    this.store.pipe(select(fromShared.isCommentModalOpened), takeWhile(() => this.componentActive)).subscribe(
      commentModalState => {
        this.addCommentOpened = commentModalState;
      }
    );

    this.store.pipe(select(fromShared.isConfirmModalOpened), takeWhile(() => this.componentActive)).subscribe(
      confirmModalState => {
        this.deleteCommentState = confirmModalState;
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getAddCommentError), takeWhile(() => this.componentActive)).subscribe(
      commentError => {
        this.addCommentError = commentError;
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getUpdateCommentError), takeWhile(() => this.componentActive)).subscribe(
      updateCommentError => {
        this.editCommentError = updateCommentError;
      }
    );

    this.store.pipe(select(fromTvSeriesModule.getDeleteCommentError), takeWhile(() => this.componentActive)).subscribe(
      deleteCommentError => {
        this.deleteCommentError = deleteCommentError;
      }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
