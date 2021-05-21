import { Injectable } from '@angular/core';
import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HappeningNowService {

  private headers: HttpHeaders;
  getEventsHappeningNowUrl: string;
  

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) 
    {

    this.headers = this.endpoint.headers();
    this.getEventsHappeningNowUrl =  this.endpoint.apiHost + '/events_happening_now'; 
    
  }

  
  getEventsHappeningNow(): Promise<any> {
    return new Promise((resolve, reject) => {
      let events_happening_now: any[] = [];
      const url = this.getEventsHappeningNowUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_events_happening_now_ok: ', res);
          events_happening_now = res;
          resolve(events_happening_now);
        },
        err => {
          console.log('get_events_happening_now_error: ', err);
          reject(err);
        }
      );
    });
  }

}
