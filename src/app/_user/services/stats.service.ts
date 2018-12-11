import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getStats(): Observable<any> {
    const url = `${this.BASE_URL}/Stats`;
    return this.http.get(url, { withCredentials: true});
  }
}
