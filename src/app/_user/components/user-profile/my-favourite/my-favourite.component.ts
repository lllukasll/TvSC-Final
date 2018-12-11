import { Component, OnInit, Input } from '@angular/core';
import { IFavouriteTvSeries } from '../../../models/tvSeries';
import { IUserWatchedEpisodes } from '../../../models/episodes';
import { ITvSeriesProposition } from '../../../models/tvSeriesProposition';

@Component({
  selector: 'app-my-favourite',
  templateUrl: './my-favourite.component.html',
  styleUrls: ['./my-favourite.component.scss']
})
export class MyFavouriteComponent implements OnInit {
  @Input() userFavouriteTvSeries: IFavouriteTvSeries[];
  @Input() lastWatchedEpisodes: IUserWatchedEpisodes[];
  @Input() propositions: ITvSeriesProposition[];

  constructor() { }

  ngOnInit() {
  }

}
