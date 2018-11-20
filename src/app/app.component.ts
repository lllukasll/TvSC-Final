import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../app/_user/reducers';
import { GetUserByCookie } from './_user/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TvSC-Final';

  constructor(private store: Store<fromAuth.State>) {

  }

  ngOnInit() {
    this.store.dispatch(new GetUserByCookie());
  }
}
