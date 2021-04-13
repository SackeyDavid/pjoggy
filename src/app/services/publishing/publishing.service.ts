import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  private headers: HttpHeaders;
  publishUrl: string;
  

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.publishUrl = this.endpoint.apiHost + '/v1/publish_event/';
  }

  publishEvent(eventId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = this.publishUrl + eventId;
      this.http.post<any>(url, '', { headers: this.headers}).subscribe(
        res => {
          console.log('publish_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);            
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('publish_error: ', err);
          reject(err);
        }
      );
    });
  }

}
