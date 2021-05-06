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
  private getEventUrl: string

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) { 
      this.headers = this.endpoint.headers();
      this.editSchedulingUrl = this.endpoint.apiHost + '/v1/edit_schedule/';
      this.getSchedulingUrl = this.endpoint.apiHost + '/v1/get_schedule/';
      this.createSchedulingUrl = this.endpoint.apiHost + '/v1/create_schedule';
      this.getEventUrl = this.endpoint.apiHost + '/get_event_data/';
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

    /**
   * Edits an event schedule.
   * @param scheduleID Schedule ID.
   * @param schedule Schedule
   * @returns 
   */ 
  editSchedule(scheduleID: any, schedule: any): Promise<any> {
    // console.log(this.editSchedulingUrl);
    const url = this.editSchedulingUrl + scheduleID
    return new Promise((resolve, reject) => {
      const body = {       
        'recurs': schedule.recurs,        
        'occurs_every': schedule.occurs_every,         
      };

      console.log(body);

      this.http.post<any>(url, JSON.stringify(body), { headers: this.headers}).subscribe(
        res => {
          console.log('edit_schedule_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(true);            
          }
          else {
            resolve(false);
          }
        },
        err => {
          console.error('edit_event_error: ', err);
          reject(err);
        }
      );
    });
  }


    getCreatedEvent(eventId: string): Promise<any> {
      return new Promise((resolve, reject) => {
        let event;
        const url = this.getEventUrl + eventId;
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
