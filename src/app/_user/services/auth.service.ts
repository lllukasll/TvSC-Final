import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:50388';

  constructor(private http: HttpClient) { }

  logIn(login: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/account/login`;
    return this.http.post<Credentials>(url, {login, password}, { withCredentials: true });
  }

  getUserByCookie(): Observable<any> {
    const url = `${this.BASE_URL}/account/getUserByCookie`;
    return this.http.get(url, { withCredentials: true});
  }

  signUp(userName: string, firstName: string, lastName: string, email: string,
         password: string, confirmPassword: string): Observable<Credentials> {
    const url = `${this.BASE_URL}/account/register`;
    return this.http.post<Credentials>(url, {userName, firstName, lastName, email, password, confirmPassword});
  }

  logout(): Observable<any> {
    const url = `${this.BASE_URL}/account/logout`;
    return this.http.post<any>(url, null, { withCredentials: true });
  }

  updateAvatar(avatarModel): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('avatar', avatarModel.avatar);

    const url = `${this.BASE_URL}/account/updateAvatar`;
    return this.http.put<any>(url, uploadData, { withCredentials: true});
  }

  changePassword(changePasswordModel): Observable<any> {
    const url = `${this.BASE_URL}/account/changePassword`;
    return this.http.post<any>(url, changePasswordModel, { withCredentials: true });
  }
}
