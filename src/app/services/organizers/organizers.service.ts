import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrganizersService {

  private headers: HttpHeaders;
  private getOrganizerUrl: string;
  private hasOrganizerUrl: string;
  private deleteOrganizerUrl: string;
  private editOrganizerUrl: string;
  private createOrganizerUrtl: string;

  constructor(private http: HttpClient, private endpoint: EndpointService) {
    this.headers = this.endpoint.headers();
    this.editOrganizerUrl = this.endpoint.apiHost + '/v1/edit_organizer/';
    this.getOrganizerUrl = this.endpoint.apiHost + '/get_events_organizers/';
    this.createOrganizerUrtl = this.endpoint.apiHost + '/v1/create_organizer';
    this.hasOrganizerUrl = this.endpoint.apiHost + '/v1/hasOrganizer/';
    this.deleteOrganizerUrl = this.endpoint.apiHost + '/v1/delete_organizer/';
  }

  /**
   * Creates a new organizer for an event.
   * @param organizer Organizer
   * @returns 
   */
  createOrganizer(organizer: any): Promise<any> {
    console.log(this.createOrganizerUrtl);
    return new Promise((resolve, reject) => {
      const body = {
        'event_id': organizer.eventId,
        'organizer': organizer.organizer,
        'bio': organizer.bio,
        'facebook': organizer.facebook,
        'twitter': organizer.twitter,
        'linkedin': organizer.linkedin,
        'instagram': organizer.instagram
      };

      console.log(body);

      this.http.post<any>(this.createOrganizerUrtl, JSON.stringify(body), { headers: this.headers}).subscribe(
        res => {
          console.log('create_organizer_ok: ', res);
          if (_.toLower(res.message) == 'ok') {
            resolve(res.id);
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
  editOrganizer(organizerId: string, organizer: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.editOrganizerUrl + organizerId;
      const body = {
        'organizer': organizer.quantity,
        'bio': organizer.price,
        'facebook': organizer.facebook,
        'twitter': organizer.twitter,
        'linkedin': organizer.linkedin,
        'instagram': organizer.instagram
      };

      this.http.post<any>(url, JSON.stringify(body), { headers: this.headers }).subscribe(
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
