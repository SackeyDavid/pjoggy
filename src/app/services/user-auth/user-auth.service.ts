import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://events369.logitall.biz/api/';

  regsiterUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', user);      
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', user);      
  }

  authenticatePhone(code: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'twoWayAuthenticationVerification/' + sessionStorage.getItem('user_id') + '/' + code + '/' + sessionStorage.getItem('user_phone'), {});      
  }

  accountRecovery(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'forgotPassword', user);      
  }

  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'resetPassword', user);      
  }

}
