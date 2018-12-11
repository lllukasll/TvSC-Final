import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  addComment(commentModel, tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/Comment/${tvSeriesId}`;

    return this.http.post(url, commentModel , { withCredentials: true});
  }

  deleteComment(commentId): Observable<any> {
    const url = `${this.BASE_URL}/Comment/${commentId}`;
    return this.http.delete(url, { withCredentials: true});
  }

  updateComment(commentModel, commentId): Observable<any> {
    const url = `${this.BASE_URL}/Comment/${commentId}`;
    return this.http.put(url, commentModel, { withCredentials: true});
  }

  getTvSeriesComments(tvSeriesId): Observable<any> {
    const url = `${this.BASE_URL}/Comment/${tvSeriesId}`;
    return this.http.get(url, { withCredentials: true});
  }
}
