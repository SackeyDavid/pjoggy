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
  getEventUrl: string;
  private getLiveVideosUrl: string;
  private storeLiveVideosUrl: string;
  private deleteLiveVideoUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.formHeaders = this.endpoint.headers(true);
    this.editDetailsUrl = this.endpoint.apiHost + '/v1/edit_more_event_info/'; 
    this.getEventUrl = this.endpoint.apiHost + '/get_event_data/';
    this.storeLiveVideosUrl = this.endpoint.apiHost + '/v1/store_live_video/';
    this.getLiveVideosUrl = this.endpoint.apiHost + '/get_live_video';
    this.deleteLiveVideoUrl = this.endpoint.apiHost + '/v1/delete_live_video/';
  }

  editEventDetails(event: any, banner: File, eventId: any): Promise<any> {
    console.log(this.editDetailsUrl, eventId);

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('banner_image', banner);
      formData.append('organizer', event.organizer);
      formData.append('email', event.email);
      formData.append('phone', event.phone);
      formData.append('hosted_on', JSON.stringify(event.hosted_on));

      const url = this.editDetailsUrl + eventId;
      this.http.post<any>(url, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('edit_event_more_info_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.message); 
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('edit_event_more_info_error: ', err);
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

  
  storeVideo(video: File, eventId: any): Promise<any> {
    console.log(this.storeLiveVideosUrl);
    console.log(eventId);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('video_id', '0');

      this.http.post<any>(this.storeLiveVideosUrl + eventId, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('store_video_ok: ', res);
          resolve(res.message);
        },
        err => {
          console.error('store_video_error: ', err);
          reject(err);
        }
      );
    });
  }

  deleteVideo(video: File, eventId: any): Promise<any> {
    console.log(this.deleteLiveVideoUrl);
    console.log(eventId);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('event_id', eventId);

      this.http.post<any>(this.deleteLiveVideoUrl + eventId, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('store_video_ok: ', res);
          resolve(res.message);
        },
        err => {
          console.error('store_video_error: ', err);
          reject(err);
        }
      );
    });
  }

  getVideos(eventId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let images: any[] = [];
      const url = this.getLiveVideosUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_live_videos_ok: ', res);
          images = res;
          resolve(images);
        },
        err => {
          console.log('get_live_videos_error: ', err);
          reject(err);
        }
      );
    });
  }




}
