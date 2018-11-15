import { Component, OnInit, HostListener } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-tv-series-calendar',
  templateUrl: './tv-series-calendar.component.html',
  styleUrls: ['./tv-series-calendar.component.scss']
})
export class TvSeriesCalendarComponent implements OnInit {
  tooday = moment().format('DD/MM/YYYY');
  innerWidth: any;
  screenSize: string;

  constructor() {
    this.screenSize = 'month';
    this.onResize();
  }

  changeCalendar(type: string): void {
    this.screenSize = type;
  }

  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.innerWidth = window.innerWidth;
    if (window.innerWidth >= 1000) {
      this.screenSize = 'month';
    } else if (window.innerWidth <= 1000) {
      this.screenSize = 'week';
      if (window.innerWidth <= 500) {
        this.screenSize = 'day';
      }
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (window.innerWidth >= 1000) {
      this.screenSize = 'month';
    } else if (window.innerWidth <= 1000) {
      this.screenSize = 'week';
      if (window.innerWidth <= 500) {
        this.screenSize = 'day';
      }
    }
  }

}
