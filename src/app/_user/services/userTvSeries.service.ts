import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTvSeriesService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getUserFavouriteTvSeries(): Observable<any> {
    const url = `${this.BASE_URL}/tvShows/favourite/user`;
    return this.http.get(url, { withCredentials: true});
  }

  getLastWatchedEpisodes(numberOfEpisodes: number): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/lastWatchedEpisodes/${numberOfEpisodes}`;
    return this.http.get(url, { withCredentials: true });
  }

  getPropositions(): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/propositions`;
    return this.http.get(url, { withCredentials: true });
  }
}
