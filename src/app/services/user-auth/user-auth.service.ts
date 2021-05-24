import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private headers: HttpHeaders;  
  private baseUrl = 'http://events369.logitall.biz/api/';
  public facebookAuthUrl = 'http://events369.logitall.biz/api/auth/facebook';
  public googleAuthUrl = 'http://events369.logitall.biz/api/auth/google';
  private sendMagicUrl = 'http://events369.logitall.biz/api/sendmagiclink';

  constructor(
    private http: HttpClient,
    private endpoint: EndpointService
    ) { 
      this.headers = this.endpoint.headers();
    
    }



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

  // signUpWithFacebook(): Observable<any> {
  //   return this.http.get<any>(this.facebookAuthUrl);      
  // }

  signUpWithGoogle(): Observable<any> {
    return this.http.get<any>(this.googleAuthUrl);      
  }

  signUpWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = this.facebookAuthUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('facebook_auth_ok: ', res);
          // events = res;
          resolve(true);
        },
        err => {
          console.log('facebook_auth_error: ', err);
          reject(err);
        }
      );
    });
  }

  // signUpWithGoogle(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // let events: any[] = [];
  //     // var userId = sessionStorage.getItem('events_user_id');
  //     const url = this.googleAuthUrl;
  //     this.http.get<any>(url, { headers: this.headers}).subscribe(
  //       res => {
  //         console.log('facebook_auth_ok: ', res);
  //         // events = res;
  //         resolve(true);
  //       },
  //       err => {
  //         console.log('facebook_auth_error: ', err);
  //         reject(err);
  //       }
  //     );
  //   });
  // }

}
