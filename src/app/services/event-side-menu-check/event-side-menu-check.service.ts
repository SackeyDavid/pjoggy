import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventSideMenuCheckService {

  data: any

  constructor() { }

  eventHasScheduleData() {
    this.data = sessionStorage.getItem('created_event')
    this.data = JSON.parse(this.data)
    console.log(this.data)
    if(this.data.schedule.length > 0) {
      return true
    }
    else {
      return false
    }
  }

  eventHasMoreDetailsData() {
    this.data = sessionStorage.getItem('created_event')
    this.data = JSON.parse(this.data)
    if(this.data.event[0].banner_image != null) {
      return true
    }
    else {
      return false
    }
  }

  eventHasTicketingData() {
    this.data = sessionStorage.getItem('created_event')
    this.data = JSON.parse(this.data)
    if(this.data.tickets.length > 0) {
      return true
    }
    else {
      return false
    }
  }

  eventHasPublishingData() {
    this.data = sessionStorage.getItem('created_event')
    this.data = JSON.parse(this.data)
    if(this.data.event[0].event_url !== null) {
      return true
    }
    else {
      return false
    }
  }


}
