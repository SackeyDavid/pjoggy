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
  private hasSchedulingUrl: string;
  private deleteSchedulingUrl: string;
  private editSchedulingUrl: string;
  private createSchedulingUrl: string;

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) { 
      this.headers = this.endpoint.headers();
      this.editSchedulingUrl = this.endpoint.apiHost + '/v1/edit_ticket/';
      this.getSchedulingUrl = this.endpoint.apiHost + '/get_events_tickets/';
      this.createSchedulingUrl = this.endpoint.apiHost + '/create_ticket';
      this.hasSchedulingUrl = this.endpoint.apiHost + '/hasTicket/';
      this.deleteSchedulingUrl = this.endpoint.apiHost + '';
    }

    createTicket(ticket: any): Promise<any> {
      console.log(this.createSchedulingUrl);
      return new Promise((resolve, reject) => {
        const body = {
          'event_id': ticket.eventId,
          'name': ticket.name,
          'quantity': ticket.quantity,
          'price': ticket.price,
          'sales_startdate': ticket.salesStartDate,
          'sales_enddate': ticket.salesEndDate,
          'currency': ticket.currency
        };
  
        console.log(body);
  
        this.http.post<any>(this.createSchedulingUrl, JSON.stringify(body), { headers: this.headers}).subscribe(
          res => {
            console.log('create_ticket_ok: ', res);
            if (_.toLower(res.message) == 'ok') {
              resolve(res.id);
            }
            else {
              resolve(0);
            }
          },
          err => {
            console.error('create_ticket_error: ', err);
            reject(err);
          }
        );
      });
    }
  
    /**
     * Edits an event ticket.
     * @param ticketId Ticket ID.
     * @param ticket Ticket
     * @returns 
     */ 
    editTicket(ticketId: string, ticket: any): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const url = this.editSchedulingUrl + ticketId;
        const body = {
          // 'event_id': ticket.eventId,
          'name': ticket.name,
          'quantity': ticket.quantity,
          'price': ticket.price,
          'sales_startdate': ticket.salesStartDate,
          'sales_enddate': ticket.salesEndDate,
          'currency': ticket.currency
        };
  
        this.http.post<any>(url, JSON.stringify(body), { headers: this.headers }).subscribe(
          res => {
            console.log('edit_ticket_ok: ', res);
            if (_.toLower(res.message) == 'ok') {
              resolve(true);
            }
            else {
              resolve(false);
            }
          },
          err => {
            console.error('edit_ticket_error: ', err);
            reject(err);
          }
        );
      });
    }
  
    /**
     * Returns a list of tickets for an event.
     * @param eventId The event ID.
     * @returns 
     */
    getTickets(eventId: string): Promise<Array<any>> {
      return new Promise((resolve, reject) => {
        let tickets: any[] = [];
        const url = this.getSchedulingUrl + eventId;
        this.http.get<any>(url, { headers: this.headers}).subscribe(
          res => {
            console.log('get_tickets_ok: ', res);
            tickets = res;
            resolve(tickets);
          },
          err => {
            console.log('get_tickets_error: ', err);
            reject(err);
          }
        );
      });
    }
  
    /**
     * Determines if an event has tickets.
     * @param eventId Event ID.
     * @returns 
     */
    hasTickets(eventId: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const url = this.hasSchedulingUrl + eventId;
        this.http.get<any>(url, { headers: this.headers }).subscribe(
          res => {
            console.log('has_tickets_ok:', res);
            if (_.toLower(res.message) == 'yes')
              resolve(true)
            else 
              resolve(false);
          },
          err => {
            console.log('has_tickets_error: ', err);
            reject(err);
          }
        );
      });
    }
  
    /**
     * Deletes a ticket.
     * @param ticketId Ticket ID.
     * @returns 
     */
    deleteTicket(ticketId: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const url = this.deleteSchedulingUrl = ticketId;
        this.http.post(url, {}, { headers: this.headers }).subscribe(
          res => {},
          err =>{}
        );
      });
    }
}
