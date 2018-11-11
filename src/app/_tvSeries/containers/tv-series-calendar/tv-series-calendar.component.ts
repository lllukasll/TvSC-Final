import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-tv-series-calendar',
  templateUrl: './tv-series-calendar.component.html',
  styleUrls: ['./tv-series-calendar.component.scss']
})
export class TvSeriesCalendarComponent implements OnInit {

  tooday = moment().format('DD/MM/YYYY');

  constructor() { }

  ngOnInit() {
  }

}
