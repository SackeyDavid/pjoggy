import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  private headers: HttpHeaders;
  private formHeaders: HttpHeaders;
  
  private getSponsorsUrl: string;
  private createSponsorUrl: string;
  private editSponsorUrl: string;
  private deleteSponsorUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.formHeaders = this.endpoint.headers(true);
    this.getSponsorsUrl = this.endpoint.apiHost + '/v1/get_sponsors/';
    this.createSponsorUrl = this.endpoint.apiHost + '/v1/create_sponsor';
    this.editSponsorUrl = this.endpoint.apiHost + '/v1/edit_sponsor/';
    this.deleteSponsorUrl = this.endpoint.apiHost + '/v1/delete_sponsor/';
  }

  createSponsor(image: File, eventId: any): Promise<any> {
    console.log(this.createSponsorUrl);
    console.log(eventId);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('logo', image);
      formData.append('event_id', eventId);

      this.http.post<any>(this.createSponsorUrl, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('create_image_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.message);
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('create_image_error: ', err);
          reject(err);
        }
      );
    });
  }

  getSponsors(eventId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let images: any[] = [];
      const url = this.getSponsorsUrl + eventId;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_event_images_ok: ', res);
          images = res;
          resolve(images);
        },
        err => {
          console.log('get_event_images_error: ', err);
          reject(err);
        }
      );
    });
  }
  
}
