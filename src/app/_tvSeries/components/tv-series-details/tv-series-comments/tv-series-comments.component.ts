import { Component, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import * as fromTvSeriesModule from '../../../reducers';
import * as fromAuth from '../../../../_user/reducers';
import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IComment } from '../../../models/comment';
import * as moment from 'moment';

@Component({
  selector: 'app-tv-series-comments',
  templateUrl: './tv-series-comments.component.html',
  styleUrls: ['./tv-series-comments.component.scss']
})
export class TvSeriesCommentsComponent implements OnInit, OnDestroy {
  comments$: IComment[];
  componentActive = true;
  loading = false;
  timeNow = moment();
  loggedUser$: any;
  @Output() editClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  constructor(private store: Store<fromTvSeriesModule.State>) { }

  isAuthor = (comment: IComment) => {
    if ( this.loggedUser$ && this.loggedUser$.userName === comment.user) {
      return true;
    }
    return false;
  }

  getTime(comment: IComment) {
    moment.locale('pl');
    if (moment(comment.createDateTime) < moment(comment.updateDateTime)) {
      return moment(comment.updateDateTime).startOf('minute').fromNow() + ' [Edytowany]';
    }
    return moment(comment.createDateTime).startOf('minute').fromNow();
  }

  onEditClicked = (comment: IComment) => {
    this.editClicked.emit(comment);
  }

  onDeleteClicked = (comment: IComment) => {
    this.deleteClicked.emit(comment);
  }

  ngOnInit() {
    this.store.pipe(select(fromTvSeriesModule.getComments), takeWhile(() => this.componentActive)).subscribe(
      comments => {
        this.comments$ = comments;
      }
    );

    this.store.select(fromAuth.getLoggedUser).subscribe(
      loggedUser => { this.loggedUser$ = loggedUser; }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
