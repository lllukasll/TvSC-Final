import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getTvSeriesEpisodes(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/seasonWithEpisodes/${tvSeriesId}`;
    return this.http.get(url, { withCredentials: true} );
  }

  addEpisodeToWatched(episodeId): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/${episodeId}`;
    return this.http.post(url, null, { withCredentials: true});
  }

  removeWatchedEpisode(episodeId): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/${episodeId}`;
    return this.http.delete(url, { withCredentials: true} );
  }

  addWatchedSeason(seasonId): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/season/${seasonId}`;
    return this.http.post(url, null, { withCredentials: true} );
  }

  removeWatchedSeason(seasonId): Observable<any> {
    const url = `${this.BASE_URL}/UserWatchedEpisodes/season/${seasonId}`;
    return this.http.delete(url, { withCredentials: true} );
  }
}
