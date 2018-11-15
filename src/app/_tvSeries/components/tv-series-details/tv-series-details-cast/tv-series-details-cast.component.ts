import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tv-series-details-cast',
  templateUrl: './tv-series-details-cast.component.html',
  styleUrls: ['./tv-series-details-cast.component.scss']
})
export class TvSeriesDetailsCastComponent implements OnInit {

  @Input() cast: any[];
  constructor() { }

  ngOnInit() {
  }

}
