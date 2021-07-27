import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  private headers: HttpHeaders;
  getEventUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.getEventUrl = this.endpoint.apiHost + '/get_event_data/';
  }

  getCreatedEvent(): Promise<any> {
    return new Promise((resolve, reject) => {
      let event;
      const url = this.getEventUrl + sessionStorage.getItem('preview_event_id');
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_created_event: ', res);
          event = res;
          resolve(event);
        },
        err => {
          console.log('get_created_event_error: ', err);
          reject(err);
        }
      );
    });
  }

}
