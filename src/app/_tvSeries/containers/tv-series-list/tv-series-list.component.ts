import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as tvShowsActions from '../../actions/tvSeries.actions';
import * as fromTvSeries from '../../reducers/tvSeries.reducer';
import { State } from '../../../reducers';
import { TvShow } from '../../models/tvShow';

@Component({
  selector: 'app-tv-series-list',
  templateUrl: './tv-series-list.component.html',
  styleUrls: ['./tv-series-list.component.scss']
})
export class TvSeriesListComponent implements OnInit {

  tvShows$: any[];

  tvShowsArray = [
    {
      name : 'Sherlock',
      station : 'BBC',
      tags : [
        {
          type: 'action',
          name: 'Akcja'
        },
        {
          type: 'thriller',
          name: 'Thriller'
        }
      ],
      description : 'Współczesna interpretacja opowiadań Arthura Conana Doyle’a o detektywie Sherlocku Holmesie',
      img : '../../../../assets/img/sherlock.jpg',
      cast : [
        {
          img : '../../../../assets/img/cast1.jpg'
        },
        {
          img : '../../../../assets/img/cast2.jpg'
        },
        {
          img : '../../../../assets/img/cast3.jpg'
        },
        {
          img : '../../../../assets/img/cast4.jpg'
        }
      ]
    },
    {
      name : 'Stranger Things',
      station : 'Netflix',
      tags : [
        {
          type: 'action',
          name: 'Akcja'
        },
        {
          type: 'fantasy',
          name: 'Fantasy'
        }
      ],
      description : 'Zaginięcie chłopca jest początkiem dziwnych i niebezpiecznych wydarzeń trapiących prowincjonalne miasteczko. ',
      img : '../../../../assets/img/strangerThings.jpg',
      cast : [
        {
          img : '../../../../assets/img/strangerThings/cast1.jpg'
        },
        {
          img : '../../../../assets/img/strangerThings/cast2.jpg'
        },
        {
          img : '../../../../assets/img/strangerThings/cast3.jpg'
        },
        {
          img : '../../../../assets/img/strangerThings/cast4.jpg'
        }
      ]
    },
    {
      name : 'Gra o tron',
      station : 'HBO',
      tags : [
        {
          type: 'action',
          name: 'Akcja'
        },
        {
          type: 'fantasy',
          name: 'Fantasy'
        }
      ],
      // tslint:disable-next-line:max-line-length
      description : 'Adaptacja sagi Georgea R.R. Martina. W królestwie Westeros walka o władzę, spiski oraz zbrodnie są na porządku dziennym.',
      img : '../../../../assets/img/gameOfThrones/poster.jpg',
      cast : [
        {
          img : '../../../../assets/img/gameOfThrones/cast1.jpg'
        },
        {
          img : '../../../../assets/img/gameOfThrones/cast2.jpg'
        },
        {
          img : '../../../../assets/img/gameOfThrones/cast3.jpg'
        },
        {
          img : '../../../../assets/img/gameOfThrones/cast4.jpg'
        }
      ]
    },
    {
      name : 'Breaking Bad',
      station : 'AMC',
      tags : [
        {
          type: 'action',
          name: 'Akcja'
        },
        {
          type: 'fantasy',
          name: 'Thriller'
        }
      ],
      // tslint:disable-next-line:max-line-length
      description : 'amerykański serial telewizyjny z gatunku komediodramatu kryminalnego stworzony przez Vince’a Gilligana i kręcony w Albuquerque w Nowym Meksyku.',
      img : '../../../../assets/img/breakingBad/poster.jpg',
      cast : [
        {
          img : '../../../../assets/img/breakingBad/cast1.jpg'
        },
        {
          img : '../../../../assets/img/breakingBad/cast2.jpg'
        },
        {
          img : '../../../../assets/img/breakingBad/cast3.jpg'
        },
        {
          img : '../../../../assets/img/breakingBad/cast4.jpg'
        }
      ]
    },
    {
      name : 'Wikingowie',
      station : 'AMC',
      tags : [
        {
          type: 'action',
          name: 'Akcja'
        },
        {
          type: 'fantasy',
          name: 'Thriller'
        }
      ],
      // tslint:disable-next-line:max-line-length
      description : 'Młody wiking, Ragnar Lothbrok, pragnie, by wyprawy łupieżcze odbywały się nie tylko na wschód, ale także w kierunku przeciwnym.',
      img : '../../../../assets/img/vikings/poster.jpg',
      cast : [
        {
          img : '../../../../assets/img/vikings/cast1.jpg'
        },
        {
          img : '../../../../assets/img/vikings/cast2.jpg'
        },
        {
          img : '../../../../assets/img/vikings/cast3.jpg'
        },
        {
          img : '../../../../assets/img/vikings/cast4.jpg'
        },
        {
          img : '../../../../assets/img/vikings/cast5.jpg'
        }
      ]
    }
  ];

  constructor(private store: Store<fromTvSeries.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new tvShowsActions.LoadTvShowsAction());
    this.store.pipe(select(fromTvSeries.getTvSeries)).subscribe(
      tvShows => { this.tvShows$ = tvShows; }
    );
  }
}
