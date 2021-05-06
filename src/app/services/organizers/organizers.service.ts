import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrganizersService {

  private headers: HttpHeaders;
  private formHeaders: HttpHeaders;
  
  private getOrganizerUrl: string;
  private hasOrganizerUrl: string;
  private deleteOrganizerUrl: string;
  private editOrganizerUrl: string;
  private createOrganizerUrtl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.formHeaders = this.endpoint.headers(true);
    this.editOrganizerUrl = this.endpoint.apiHost + '/v1/edit_organizer/';
    this.getOrganizerUrl = this.endpoint.apiHost + '/v1/get_organizers/';
    this.createOrganizerUrtl = this.endpoint.apiHost + '/v1/create_organizer/';
    this.hasOrganizerUrl = this.endpoint.apiHost + '/v1/hasOrganizer/';
    this.deleteOrganizerUrl = this.endpoint.apiHost + '/v1/delete_organizer/';
  }

  /**
   * Creates a new organizer for an event.
   * @param organizer Organizer
   * @returns 
   */
  createOrganizer(organizer: any, image: File, eventId: any): Promise<any> {
    console.log(this.createOrganizerUrtl);
    console.log(organizer);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', organizer.name);
      formData.append('bio', organizer.bio);
      formData.append('facebook', organizer.facebook);      
      formData.append('twitter', organizer.twitter);      
      formData.append('linkedin', organizer.linkedin);      
      formData.append('instagram', organizer.instagram);      

      const url = this.createOrganizerUrtl + eventId;
      this.http.post<any>(url, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('create_organizer_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.message);
          }
          else {
            resolve(0);
          }
        },
        err => {
          console.error('create_organizer_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Edits an event organizer.
   * @param organizerId Organizer ID.
   * @param organizer Organizer
   * @returns 
   */ 
  editOrganizer(organizerId: string, organizer: any, image: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.editOrganizerUrl + organizerId;
      const formData = new FormData();
      formData.append('image', image);
      formData.append('organizer', organizer.name);
      formData.append('bio', organizer.bio);
      formData.append('facebook', organizer.facebook);      
      formData.append('twitter', organizer.twitter);      
      formData.append('linkedin', organizer.linkedin);      
      formData.append('instagram', organizer.instagram);

      this.http.post<any>(url, formData, { headers: this.formHeaders }).subscribe(
        res => {
          console.log('edit_organizer_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(true);
          }
          else {
            resolve(false);
          }
        },
        err => {
          console.error('edit_organizer_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Returns a list of organizers for an event.
   * @param eventId The event ID.
   * @returns 
   */
  getOrganizers(eventId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let organizers: any[] = [];
      const url = this.getOrganizerUrl + eventId;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_organizers_ok: ', res);
          organizers = res;
          resolve(organizers);
        },
        err => {
          console.log('get_organizers_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Determines if an event has organizers. 
   * @param eventId Event ID.
   * @returns 
   */
  hasOrganizers(eventId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.hasOrganizerUrl + eventId;
      this.http.get<any>(url, { headers: this.headers }).subscribe(
        res => {
          console.log('has_organizers_ok:', res);
          if (_.toLower(res.message) == 'yes')
            resolve(true)
          else 
            resolve(false);
        },
        err => {
          console.log('has_organizers_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Deletes a organizer.
   * @param organizerId Organizer ID.
   * @returns 
   */
  deleteOrganizer(organizerId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.deleteOrganizerUrl + organizerId;
      this.http.post<any>(url, {}, { headers: this.headers }).subscribe(
        res => {
          console.log('delete_organizer_ok:', res);
          if (_.toLower(res.message) == 'ok')
            resolve(true)
          else 
            resolve(false);
        },
        err =>{
          console.log('delete_organizer_error: ', err);
          reject(err);
        }
      );
    });
  }

}
