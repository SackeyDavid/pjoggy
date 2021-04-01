import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  private headers: HttpHeaders;
  createBasicUrl: string;
  getBasicUrl: string;
  updateBasicUrl: string;
  getCategoriesUrl: string;
  getSubcategoriesUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.createBasicUrl = this.endpoint.apiHost + '/v1/create_event';
    this.getBasicUrl = this.endpoint.apiHost + '/get_event_data';
    this.updateBasicUrl = this.endpoint.apiHost + '';  // not available
    this.getCategoriesUrl = this.endpoint.apiHost + '/view_categories';
    this.getSubcategoriesUrl = this.endpoint.apiHost + '/view_sub_categories/';
  }

  createBasicEvent(event: any): Promise<any> {
    console.log(this.createBasicUrl);
    return new Promise((resolve, reject) => {
      const body = {
        'title': event.title,        
        'description': event.description,
        'venue': event.venue,        
        'gps': event.gps,        
        'start_date': event.start_date,        
        'end_date': event.end_date,        
        'recurring': event.recurring,        
        'type': event.type,        
        'category_id': event.category_id,        
        'subcategory_id': event.subcategory_id,        
        'tags': event.tags,        
        'venue_tobe_announced': event.venue_tobe_announced,        
        'hosting': event.hosting,
        'ticketing': event.ticketing     
      };

      console.log(body);

      this.http.post<any>(this.createBasicUrl, JSON.stringify(body), { headers: this.headers}).subscribe(
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

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      let tickets: any[] = [];
      const url = this.getCategoriesUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_categories_ok: ', res);
          tickets = res;
          resolve(tickets);
        },
        err => {
          console.log('get_categories_error: ', err);
          reject(err);
        }
      );
    });
  }

  getSubcategories(categoryId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let tickets: any[] = [];
      const url = this.getSubcategoriesUrl + categoryId;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_subcategories_ok: ', res);
          tickets = res;
          resolve(tickets);
        },
        err => {
          console.log('get_subcategories_error: ', err);
          reject(err);
        }
      );
    });
  }

}
