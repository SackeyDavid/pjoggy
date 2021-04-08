import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  
  private headers: HttpHeaders;
  private getSchedulingUrl: string;
  private editSchedulingUrl: string;
  private createSchedulingUrl: string;

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) { 
      this.headers = this.endpoint.headers();
      this.editSchedulingUrl = this.endpoint.apiHost + '/v1/edit_schedule/';
      this.getSchedulingUrl = this.endpoint.apiHost + '/v1/get_schedule/';
      this.createSchedulingUrl = this.endpoint.apiHost + '/v1/create_schedule';
    }

    createSchedule(schedule: any): Promise<any> {
      console.log(this.createSchedulingUrl);
      return new Promise((resolve, reject) => {
        const body = {
          'event_id': schedule.event_id,        
          'recurs': schedule.recurs,        
          'occurs_every': schedule.occurs_every,        
        };
  
        console.log(body);
  
        this.http.post<any>(this.createSchedulingUrl, JSON.stringify(body), { headers: this.headers}).subscribe(
          res => {
            console.log('create_schedule_ok: ', res);
            if (_.toLower(res.message) == 'ok') {
              resolve(res.id);            
            }
            else {
              resolve(0);
            }
          },
          err => {
            console.error('create_schedule_error: ', err);
            reject(err);
          }
        );
      });
    }
}
