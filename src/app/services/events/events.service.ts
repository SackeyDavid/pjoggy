import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private headers: HttpHeaders;
  getUserEventsUrl: string;
  
  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.getUserEventsUrl = this.endpoint.apiHost + '/v1/get_user_events_by_status/';
   }

   getUserEvents(status: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let events: any[] = [];
      var userId = sessionStorage.getItem('events_user_id');
      const url = this.getUserEventsUrl + userId + '/' + status;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_user_events_ok: ', res);
          events = res;
          resolve(events);
        },
        err => {
          console.log('get_user_events_error: ', err);
          reject(err);
        }
      );
    });
  }

}
