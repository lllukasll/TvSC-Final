import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tv-series-details-seasons',
  templateUrl: './tv-series-details-seasons.component.html',
  styleUrls: ['./tv-series-details-seasons.component.scss']
})
export class TvSeriesDetailsSeasonsComponent implements OnInit {

  @Input() seasons: any[];
  constructor() { }

  ngOnInit() {
  }

}
