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

    console.log(parameters);

    return this.http.post(url, parameters);
  }
}
