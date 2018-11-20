import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef
} from '@angular/core';
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
  @ViewChild('tvShowsHolder0', { read: ElementRef })
  public container0: ElementRef<any>;
  @ViewChild('tvShowsHolder1', { read: ElementRef })
  public container1: ElementRef<any>;
  @ViewChild('tvShowsHolder2', { read: ElementRef })
  public container2: ElementRef<any>;
  @ViewChild('tvShowsHolder3', { read: ElementRef })
  public container3: ElementRef<any>;
  @ViewChild('tvShowsHolder4', { read: ElementRef })
  public container4: ElementRef<any>;
  @ViewChild('tvShowsHolder5', { read: ElementRef })
  public container5: ElementRef<any>;
  @ViewChild('tvShowsHolder6', { read: ElementRef })
  public container6: ElementRef<any>;

  constructor(
    private store: Store<fromTvSeries.State>,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.generateCalendar();
  }

  scrollToRight(day: number): void {
    let clickedElement = this.container0;
    if (day === 0) {
      clickedElement = this.container0;
    } else if (day === 1) {
      clickedElement = this.container1;
    } else if (day === 2) {
      clickedElement = this.container2;
    } else if (day === 3) {
      clickedElement = this.container3;
    } else if (day === 4) {
      clickedElement = this.container4;
    } else if (day === 5) {
      clickedElement = this.container5;
    } else if (day === 6) {
      clickedElement = this.container6;
    }

    const screenLeft =
      clickedElement.nativeElement.scrollWidth -
      clickedElement.nativeElement.scrollLeft -
      clickedElement.nativeElement.offsetWidth;
    let scrollToDecrese = 'translateX(315px)';

    if (screenLeft < 315) {
      scrollToDecrese = 'translateX(' + screenLeft + 'px)';
    }

    if (screenLeft < 315) {
      clickedElement.nativeElement.scrollLeft += screenLeft;
    } else {
      clickedElement.nativeElement.scrollLeft += 315;
    }

    const keyframes = [
      {
        transform: scrollToDecrese
      },
      {
        transform: 'translate(0)'
      }
    ];

    const options = {
      iterations: 1,
      iterationStart: 0,
      delay: 0,
      endDelay: 0,
      direction: 'normal',
      duration: 1000,
      fill: 'none',
      easing: 'ease-in-out'
    };

    for (
      let index = 0;
      index < clickedElement.nativeElement.children.length;
      index++
    ) {
      clickedElement.nativeElement.children[index].animate(keyframes, options);
    }
  }

  scrollToLeft(day: number): void {
    var clickedElement = this.container0;
    if (day == 0) {
      clickedElement = this.container0;
    } else if (day == 1) {
      clickedElement = this.container1;
    } else if (day == 2) {
      clickedElement = this.container2;
    } else if (day == 3) {
      clickedElement = this.container3;
    } else if (day == 4) {
      clickedElement = this.container4;
    } else if (day == 5) {
      clickedElement = this.container5;
    } else if (day == 6) {
      clickedElement = this.container6;
    }

    const screenLeft = clickedElement.nativeElement.scrollLeft;
    let scrollToDecrese = "translateX(-315px)";

    if (screenLeft < 315) {
      scrollToDecrese = "translateX(-" + screenLeft + "px)";
    }

    if (screenLeft < 315) {
      clickedElement.nativeElement.scrollLeft -= screenLeft;
    } else {
      clickedElement.nativeElement.scrollLeft -= 315;
    }

    var keyframes = [
      {
        transform: scrollToDecrese
      },
      {
        transform: "translateX(0)"
      }
    ];

    var options = {
      iterations: 1,
      iterationStart: 0,
      delay: 0,
      endDelay: 0,
      direction: "normal",
      duration: 1000,
      fill: "none",
      easing: "ease-in-out"
    };

    for (
      let index = 0;
      index < clickedElement.nativeElement.children.length;
      index++
    ) {
      clickedElement.nativeElement.children[index].animate(keyframes, options);
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  getDayName(dayNumber: number): string {
    const days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota"
    ];

    return days[dayNumber];
  }

  getWeekName(): string {
    const tmp = moment(this.firstOfWeek);
    tmp.add(6, "days");
    return (
      "Tydzień " +
      this.currentDate.week() +
      " " +
      this.firstOfWeek.format("DD/MM/YYYY") +
      " - " +
      tmp.format("DD/MM/YYYY")
    );
  }

  prevWeek(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "weeks");
    this.generateCalendar();
    const lastOfWeek = moment(this.firstOfWeek).add(7, "days");
    const payload = {
      firstOfWeek: this.firstOfWeek.format("YYYY/MM/DDT00:00:00"),
      lastOfWeek: lastOfWeek.format("YYYY/MM/DDT00:00:00")
    };
    this.store.dispatch(
      new tvShowsActions.GetCurrentWeekEpisodesAction(payload)
    );
  }

  nextWeek(): void {
    this.currentDate = moment(this.currentDate).add(1, "weeks");
    this.generateCalendar();
    const lastOfWeek = moment(this.firstOfWeek).add(7, "days");
    const payload = {
      firstOfWeek: this.firstOfWeek.format("YYYY/MM/DDT00:00:00"),
      lastOfWeek: lastOfWeek.format("YYYY/MM/DDT00:00:00")
    };
    this.store.dispatch(
      new tvShowsActions.GetCurrentWeekEpisodesAction(payload)
    );
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
    const firstOfWeek = moment(currentMoment)
      .startOf("week")
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("week")
      .subtract(firstOfWeek, "days");
    const start = firstDayOfGrid.add(1, "days");
    this.firstOfWeek = moment(start);
    return _.range(start.date(), start.date() + 7).map(
      (date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          mDate: d
        };
      }
    );
  }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));
    const lastOfWeek = moment(this.firstOfWeek).add(7, "days");
    const payload = {
      firstOfWeek: this.firstOfWeek.format("YYYY/MM/DDT00:00:00"),
      lastOfWeek: lastOfWeek.format("YYYY/MM/DDT00:00:00")
    };
    this.store.dispatch(
      new tvShowsActions.GetCurrentWeekEpisodesAction(payload)
    );
    this.store
      .pipe(select(fromTvSeries.getCurrentMonthEpisodes))
      .subscribe(episodes => {
        this.currentWeekEpisodes$ = episodes;
      });
  }
}
