import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private headers: HttpHeaders;
  archiveEventUrl: string;
  cancelEventUrl: string;
  recoverEventUrl: string;
  getUserEventsUrl: string;
  getAllUserEventsUrl: string;
  getCategoriesUrl: string;
  getCategoryEventsUrl: string;
  getEventsByTypeUrl: string
  getAllEventsUrl: string;
  getTodaysEventsUrl: string;
  getEventsInSixHoursUrl: string; // upcoming events
  getPopularEventsUrl: string;
  getNewEventsUrl: string;
  getEventsHappeningNowUrl: string;
  
  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.archiveEventUrl = this.endpoint.apiHost + '/v1/archive_event/';
    this.cancelEventUrl = this.endpoint.apiHost + '/v1/cancel_event/';
    this.recoverEventUrl = this.endpoint.apiHost + '/v1/recover_event/';
    this.getUserEventsUrl = this.endpoint.apiHost + '/v1/get_user_events_by_status/';
    this.getCategoriesUrl = this.endpoint.apiHost + '/view_categories';
    this.getAllUserEventsUrl = this.endpoint.apiHost + '/v1/get_all_user_events/';
    this.getCategoryEventsUrl = this.endpoint.apiHost + '/get_events_by_category/';
    this.getEventsByTypeUrl = this.endpoint.apiHost + '/get_events_by_type/';
    this.getAllEventsUrl = this.endpoint.apiHost + '/get_events_by_type/1';
    this.getTodaysEventsUrl =  this.endpoint.apiHost + '/get_todays_events';
    this.getEventsInSixHoursUrl = this.endpoint.apiHost + '/events_six_hours';
    this.getPopularEventsUrl = this.endpoint.apiHost + '/get_popular_events';
    this.getNewEventsUrl = this.endpoint.apiHost + '/get_new_events';
    this.getEventsHappeningNowUrl = this.endpoint.apiHost + '/events_happening_now';
  }

  archiveEvent(eventId: any): Promise<any> {    
    const url = this.archiveEventUrl + eventId;
    return new Promise((resolve, reject) => {     
      this.http.post<any>(url, null, { headers: this.headers}).subscribe(
        res => {
          console.log('archive_event_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);            
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('archive_event_error: ', err);
          reject(err);
        }
      );
    });
  }

  cancelEvent(eventId: any): Promise<any> {    
    const url = this.cancelEventUrl + eventId;
    return new Promise((resolve, reject) => {     
      this.http.post<any>(url, null, { headers: this.headers}).subscribe(
        res => {
          console.log('cancel_event_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);            
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('cancel_event_error: ', err);
          reject(err);
        }
      );
    });
  }

  recoverEvent(eventId: any): Promise<any> {    
    const url = this.recoverEventUrl + eventId;
    return new Promise((resolve, reject) => {     
      this.http.post<any>(url, null, { headers: this.headers}).subscribe(
        res => {
          console.log('recovr_event_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);            
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('recover_event_error: ', err);
          reject(err);
        }
      );
    });
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

  getAllUserEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      let events: any[] = [];
      var userId = sessionStorage.getItem('events_user_id');
      const url = this.getAllUserEventsUrl + userId;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_all_events_ok: ', res);
          events = res;
          resolve(events);
        },
        err => {
          console.log('get_all_events_error: ', err);
          reject(err);
        }
      );
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      let categories: any[] = [];
      const url = this.getCategoriesUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_categories_ok: ', res);
          categories = res;
          resolve(categories);
        },
        err => {
          console.log('get_categories_error: ', err);
          reject(err);
        }
      );
    });
  }

  getCategoryEvents(category: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let events: any[] = [];
      const url = this.getCategoryEventsUrl + category;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_category_events_ok: ', res);
          events = res;
          resolve(events);
        },
        err => {
          console.log('get_all_category_error: ', err);
          reject(err);
        }
      );
    });
  }

  getEventsByType(category: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let events: any[] = [];
      const url = this.getEventsByTypeUrl + category;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_events_by_type_ok: ', res);
          events = res;
          resolve(events);
        },
        err => {
          console.log('get_events_by_type_error: ', err);
          reject(err);
        }
      );
    });
  }


  getAllEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      let events: any[] = [];
      this.http.get<any>(this.getAllEventsUrl, { headers: this.headers}).subscribe(
        res => {
          console.log('get_all_events_ok: ', res);
          events = res;
          resolve(events);
        },
        err => {
          console.log('get_events_by_type_error: ', err);
          reject(err);
        }
      );
    });
  }

  getTodaysEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      let todays_events: any[] = [];
      const url = this.getTodaysEventsUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_today_events_ok: ', res);
          todays_events = res;
          resolve(todays_events);
        },
        err => {
          console.log('get_todays_events_error: ', err);
          reject(err);
        }
      );
    });
  }

  getEventsInSixHours(): Promise<any> {
    return new Promise((resolve, reject) => {
      let events_in_six_hrs: any[] = [];
      const url = this.getEventsInSixHoursUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_events_in_six_hrs_ok: ', res);
          events_in_six_hrs = res;
          resolve(events_in_six_hrs);
        },
        err => {
          console.log('get_events_in_six_hrs_error: ', err);
          reject(err);
        }
      );
    });
  }

  getPopularEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      let popular_events: any[] = [];
      const url = this.getPopularEventsUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_popular_events_ok: ', res);
          popular_events = res;
          resolve(popular_events);
        },
        err => {
          console.log('get_popular_events_error: ', err);
          reject(err);
        }
      );
    });
  }

  getNewEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      let new_events: any[] = [];
      const url = this.getNewEventsUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_new_events_ok: ', res);
          new_events = res;
          resolve(new_events);
        },
        err => {
          console.log('get_new_events_error: ', err);
          reject(err);
        }
      );
    });
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
