import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tv-series-list-card',
  templateUrl: './tv-series-list-card.component.html',
  styleUrls: ['./tv-series-list-card.component.scss']
})
export class TvSeriesListCardComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() tags: any[];
  @Input() station: string;
  @Input() cast: any[];
  @Input() img: string;
  constructor() { }

  ngOnInit() {

  }

}
