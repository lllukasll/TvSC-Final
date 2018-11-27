import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvSeriesService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getAll(parameters): Observable<any> {
    const url = `${this.BASE_URL}/tvShow/getByParameters`;

    return this.http.post(url, parameters);
  }

  getOne(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/tvShow/${tvSeriesId}`;
    return this.http.get(url, { withCredentials: true });
  }

  getCurrentMonthEpisodes(monthNumber): Observable<any> {
    const url = `${this.BASE_URL}/Calendar/month/${monthNumber}`;
    return this.http.get(url);
  }

  getCurrentWeekEpisodes(dateModel): Observable<any> {
    const dates = {
      dateFrom: dateModel.firstOfWeek,
      dateTo: dateModel.lastOfWeek
    };
    console.log(dates)
    const url = `${this.BASE_URL}/Calendar/week`;
    return this.http.post<any>(url, dates);
  }

  addToFavourite(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/tvShows/favourite/${tvSeriesId}`;
    return this.http.post(url, null, { withCredentials: true });
  }

  removeFromFavourites(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/tvShows/favourite/${tvSeriesId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  addTvSeriesRating(tvSeriesId, ratingModel): Observable<any> {
    const url = `${this.BASE_URL}/rating/tvSeries/${tvSeriesId}`;
    return this.http.post(url, ratingModel, { withCredentials: true });
  }

  updateTvSeriesRating(ratingId, ratingModel): Observable<any> {
    const url = `${this.BASE_URL}/rating/${ratingId}`;
    return this.http.put(url, ratingModel, { withCredentials: true });
  }

  getTvSeriesClosestEpisode(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/closest/${tvSeriesId}`;
    return this.http.get(url);
  }
}
