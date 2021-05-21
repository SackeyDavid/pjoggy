import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://events369.logitall.biz/api/';

  regsiterUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', user);      
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'loginIAM', user);      
  }

  authenticatePhone(code: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'twoWayAuthenticationVerification/' + sessionStorage.getItem('user_id') + '/' + code + '/' + sessionStorage.getItem('user_phone'), {});      
  }

  accountRecovery(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'forgotPassword', user);      
  }

  resetPassword(password: any, ecncryption: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'resetPassword/' + ecncryption, password);      
  }

  singupEmail(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'registerIAM', body);      
  }

  singupMoreInfo(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'complete_registration/' + sessionStorage.getItem('registration_id'), body);      
  }

}
