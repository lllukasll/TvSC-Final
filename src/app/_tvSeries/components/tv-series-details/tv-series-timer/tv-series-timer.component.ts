import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { IEpisode } from '../../../models/episode';

@Component({
  selector: 'app-tv-series-timer',
  templateUrl: './tv-series-timer.component.html',
  styleUrls: ['./tv-series-timer.component.scss']
})
export class TvSeriesTimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() episode: IEpisode;
  timeNow = moment();
  timerStarted = false;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  info = '';

  diff: number;
  episodeTime: moment.Moment;
  diffDuration: moment.Duration;
  interval;


  constructor() { }

  generateInfo(days: number, hours: number, minutes: number, seconds: number) {
    let info = '';

    if (days !== 0) {
      info += days.toString();
    }

    if (this.days === 1) {
      info += ' dzień, ';
    } else {
      this.info += ' dni, ';
    }

    if (hours !== 0) {
      info += hours.toString();
    }

    if (this.hours === 1) {
      info += ' godzinę, ';
    } else if ((this.hours > 20 || this.hours < 10) && (this.hours % 10 === 2 || this.hours % 10 === 3 || this.hours % 10 === 4)) {
      info += ' godziny, ';
    } else {
      info += ' godzin, ';
    }

    if (minutes !== 0) {
      info += minutes.toString();
    }

    if (this.minutes === 1) {
      info += ' minutę, ';
    } else if ((this.minutes > 20 || this.minutes < 10) && (this.minutes % 10 === 2 || this.minutes % 10 === 3 || this.minutes % 10 === 4)) {
      info += ' minuty, ';
    } else {
      info += ' minut, ';
    }

    if (seconds !== 0) {
      info += seconds.toString();
    }

    if (this.seconds === 1) {
      info += ' sekundę';
    } else if ((this.seconds > 20 || this.seconds < 10) && (this.seconds % 10 === 2 || this.seconds % 10 === 3 || this.seconds % 10 === 4)) {
      info += ' sekundy';
    } else {
      info += ' sekund ';
    }

    return info;
  }

  startInterval() {
    if (this.timerStarted) {
      this.interval = setInterval(() => {
        this.timeNow = moment();
        this.diff = this.episodeTime.diff(this.timeNow);
        this.diffDuration = moment.duration(this.diff);

        this.days = this.diffDuration.days();
        this.hours = this.diffDuration.hours();
        this.minutes = this.diffDuration.minutes();
        this.seconds = this.diffDuration.seconds();

       this.info = this.generateInfo(this.days, this.hours, this.minutes, this.seconds);

        console.log('Days : ' + this.days);
        console.log('Hours : ' + this.hours);
        console.log('Minutes : ' + this.minutes);
        console.log('Seconds : ' + this.seconds);
      }, 1000);
    }
  }

  ngOnChanges() {
    if (this.episode && this.episode.airingDate && !this.timerStarted) {
      this.episodeTime = moment(this.episode.airingDate);
      this.diff = this.episodeTime.diff(this.timeNow);
      this.diffDuration = moment.duration(this.diff);

      this.days = this.diffDuration.days();
      this.hours = this.diffDuration.hours();
      this.minutes = this.diffDuration.minutes();
      this.seconds = this.diffDuration.seconds();

      this.timerStarted = true;
      this.startInterval();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.timerStarted = false;
    clearInterval(this.interval);
  }

}
