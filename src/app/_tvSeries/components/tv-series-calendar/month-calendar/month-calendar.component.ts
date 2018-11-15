import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarDate } from '../../../models/calendarDate';
import { Observable } from 'rxjs';
import * as fromTvSeries from '../../../reducers/tvSeries.reducer';
import { isSpinnerShowing } from '../../../../_shared/reducers/index';
import { Store, select } from '@ngrx/store';
import * as tvShowsActions from '../../../actions/tvSeries.actions';
import { ICalendarEpisode } from '../../../models/calendarEpisode';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {
  currentDate = moment();
  weeks: CalendarDate[][] = [];
  loading: Observable<boolean>;
  currentMonthEpisodes$: ICalendarEpisode[];

  constructor(private store: Store<fromTvSeries.State>) {
    this.generateCalendar();
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }
  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  getDayEpisodes(dayNumber: number): ICalendarEpisode[] {
    return this.currentMonthEpisodes$.filter(x => {
      const date = moment(x.airingDate);
      return date.date() === dayNumber && date.month() === this.currentDate.month();
    });
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.add(1, 'days').date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                mDate: d,
              };
            });
  }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));
    this.store.dispatch(new tvShowsActions.GetCurrentMonthEpisodesAction(this.currentDate.month() + 1));
    this.store.pipe(select(fromTvSeries.getCurrentMonthEpisodes)).subscribe(
      episodes => { this.currentMonthEpisodes$ = episodes; }
    );
  }

}
