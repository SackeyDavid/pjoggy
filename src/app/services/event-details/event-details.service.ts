import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  private headers: HttpHeaders;
  editDetailsUrl: string;
  getBasicUrl: string;
  updateBasicUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.editDetailsUrl = this.endpoint.apiHost + '/v1/edit_more_event_info/18';  // can't get event id for now
    this.getBasicUrl = this.endpoint.apiHost + '';  // not available
    this.updateBasicUrl = this.endpoint.apiHost + '';  // not available
  }

  editEventDetails(event: any): Promise<any> {
    console.log(this.editDetailsUrl);
    return new Promise((resolve, reject) => {
      const body = {
        'banner_image': event.banner_image,        
        'organizer': event.organizer,        
        'email': event.email,        
        'phone': event.phone,        
        'hosted_on': event.hosted_on,        
      };

      console.log(body);

      this.http.post<any>(this.editDetailsUrl, JSON.stringify(body), { headers: this.headers}).subscribe(
        res => {
          console.log('create_event_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('create_event_error: ', err);
          reject(err);
        }
      );
    });
  }

}
