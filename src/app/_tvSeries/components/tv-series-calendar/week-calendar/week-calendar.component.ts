import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarDate } from '../../../models/calendarDate';
import * as _ from 'lodash';
import { ICalendarEpisode } from '../../../models/calendarEpisode';
import { Store, select } from '@ngrx/store';
import * as fromTvSeries from '../../../reducers/tvSeries.reducer';
import { isSpinnerShowing } from '../../../../_shared/reducers/index';
import * as tvShowsActions from '../../../actions/tvSeries.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent implements OnInit {
  currentDate = moment();
  firstOfWeek = moment();
  week: CalendarDate[] = [];
  loading: Observable<boolean>;
  currentWeekEpisodes$: ICalendarEpisode[];

  constructor(private store: Store<fromTvSeries.State>) {
    this.generateCalendar();
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  getDayName(dayNumber: number): string {
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    return days[dayNumber];
  }

  getWeekName(): string {
    const tmp = moment(this.firstOfWeek);
    tmp.add(6, 'days');
    return 'Tydzień ' + this.currentDate.week() + ' ' + this.firstOfWeek.format('DD/MM/YYYY') + ' - ' + tmp.format('DD/MM/YYYY');
  }

  prevWeek(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'weeks');
    this.generateCalendar();
    const lastOfWeek = moment(this.firstOfWeek).add(7, 'days');
    const payload = {
      firstOfWeek: this.firstOfWeek.format('YYYY/MM/DDT00:00:00'),
      lastOfWeek: lastOfWeek.format('YYYY/MM/DDT00:00:00')
    };
    this.store.dispatch(new tvShowsActions.GetCurrentWeekEpisodesAction(payload));
  }

  nextWeek(): void {
    this.currentDate = moment(this.currentDate).add(1, 'weeks');
    this.generateCalendar();
    const lastOfWeek = moment(this.firstOfWeek).add(7, 'days');
    const payload = {
      firstOfWeek: this.firstOfWeek.format('YYYY/MM/DDT00:00:00'),
      lastOfWeek: lastOfWeek.format('YYYY/MM/DDT00:00:00')
    };
    this.store.dispatch(new tvShowsActions.GetCurrentWeekEpisodesAction(payload));
  }

  getDayEpisodes(dayNumber: number): ICalendarEpisode[] {
    return this.currentWeekEpisodes$.filter(x => {
      const date = moment(x.airingDate);
      return date.date() === dayNumber;
    });
  }

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    this.week = dates;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfWeek = moment(currentMoment).startOf('week').day();
    const firstDayOfGrid = moment(currentMoment).startOf('week').subtract(firstOfWeek, 'days');
    const start = firstDayOfGrid.add(1, 'days');
    this.firstOfWeek = moment(start);
    return _.range(start.date(), start.date() + 7)
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
    const lastOfWeek = moment(this.firstOfWeek).add(7, 'days');
    const payload = {
      firstOfWeek: this.firstOfWeek.format('YYYY/MM/DDT00:00:00'),
      lastOfWeek: lastOfWeek.format('YYYY/MM/DDT00:00:00')
    };
    this.store.dispatch(new tvShowsActions.GetCurrentWeekEpisodesAction(payload));
    this.store.pipe(select(fromTvSeries.getCurrentMonthEpisodes)).subscribe(
      episodes => {
        this.currentWeekEpisodes$ = episodes; }
    );
  }

}
