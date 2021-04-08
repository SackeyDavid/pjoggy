import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  private headers: HttpHeaders;
  private formHeaders: HttpHeaders;
  editDetailsUrl: string;
  getBasicUrl: string;
  updateBasicUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.formHeaders = this.endpoint.formHeaders();
    this.editDetailsUrl = this.endpoint.apiHost + '/v1/edit_more_event_info/'; 
    this.getBasicUrl = this.endpoint.apiHost + '';  // not available
    this.updateBasicUrl = this.endpoint.apiHost + '';  // not available
  }

  editEventDetails(event: any, banner: File, eventId: any): Promise<any> {
    console.log(this.editDetailsUrl);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("banner_image", banner);
      formData.append("organizer", event.organizer);
      formData.append("email", event.email);
      formData.append("phone", event.phone);
      formData.append("hosted_on", JSON.stringify(event.hosted_on));

      const url = this.editDetailsUrl + eventId;
      this.http.post<any>(url, formData, { headers: this.formHeaders}).subscribe(
        res => {
          console.log('create_event_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.message);
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
