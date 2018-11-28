import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tv-series-informations',
  templateUrl: './tv-series-informations.component.html',
  styleUrls: ['./tv-series-informations.component.scss']
})
export class TvSeriesInformationsComponent implements OnInit {
  @Input() name: string;
  @Input() network: string;
  @Input() categories: any[];
  @Input() emissionHour: string;
  @Input() episodeLength: number;
  @Input() description: string;
  @Input() rating: number;

  constructor() { }

  ngOnInit() {
  }

}
