import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private headers: HttpHeaders;
  private formHeaders: HttpHeaders;
  
  private getImagesUrl: string;
  private storeImageUrl: string;
  private deleteImageUrl: string;
  private getVidoesUrl: string;
  private storeVidoesUrl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.formHeaders = this.endpoint.headers(true);
    this.getImagesUrl = this.endpoint.apiHost + '/get_event_images/';
    this.storeImageUrl = this.endpoint.apiHost + '/v1/store_event_image';
    this.deleteImageUrl = this.endpoint.apiHost + '/v1/delete_event_image/';
    this.getVidoesUrl = this.endpoint.apiHost + '/get_event_videos/';
    this.storeVidoesUrl = this.endpoint.apiHost + '/v1/store_event_video';
  }

  storeImage(image: File, eventId: any): Promise<any> {
    console.log(this.storeImageUrl);
    console.log(eventId);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('event_id', eventId);

      this.http.post<any>(this.storeImageUrl, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('store_image_ok: ', res);
          resolve(res.message);
        },
        err => {
          console.error('store_image_error: ', err);
          reject(err);
        }
      );
    });
  }

  getImages(eventId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let images: any[] = [];
      const url = this.getImagesUrl + eventId;
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

  storeVideo(video: File, eventId: any): Promise<any> {
    console.log(this.storeVidoesUrl);
    console.log(eventId);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('event_id', eventId);

      this.http.post<any>(this.storeVidoesUrl, formData, { headers: this.formHeaders }).subscribe(
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
      const url = this.getVidoesUrl + eventId;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_event_videos_ok: ', res);
          images = res;
          resolve(images);
        },
        err => {
          console.log('get_event_videos_error: ', err);
          reject(err);
        }
      );
    });
  }

}
