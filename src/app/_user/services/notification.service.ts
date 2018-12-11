import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    const url = `${this.BASE_URL}/Notification`;
    return this.http.get(url, { withCredentials: true});
  }
}
