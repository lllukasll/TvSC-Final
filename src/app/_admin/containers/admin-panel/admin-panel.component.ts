import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../../_tvSeries/reducers/tvSeries.reducer';
import * as tvShowsActions from '../../../_tvSeries/actions/tvSeries.actions';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
