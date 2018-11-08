import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvSeriesService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const url = `${this.BASE_URL}/tvShow`;
    return this.http.get(url);
  }
}
