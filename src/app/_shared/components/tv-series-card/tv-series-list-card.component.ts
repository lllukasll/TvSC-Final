import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tv-series-card',
  templateUrl: './tv-series-list-card.component.html',
  styleUrls: ['./tv-series-list-card.component.scss']
})
export class TvSeriesCardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() tags: any[];
  @Input() station: string;
  @Input() cast: any[];
  @Input() img: string;
  @Input() episodeName: string;
  @Input() width = 300;
  @Input() height = 450;
  @Input() showDescription = true;

  constructor() {
  }

  ngOnInit() {
  }

}
