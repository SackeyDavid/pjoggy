import { Component, OnInit, Input } from '@angular/core';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher/theme-switcher.service';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import moment from 'moment';
import { EventSideMenuCheckService } from 'src/app/services/event-side-menu-check/event-side-menu-check.service';
declare var $: any;


@Component({
  selector: 'app-create-event-side-menu',
  templateUrl: './create-event-side-menu.component.html',
  styleUrls: ['./create-event-side-menu.component.scss']
})
export class CreateEventSideMenuComponent implements OnInit {

  @Input() currentPage: any;

  dark_theme: boolean = false

  event : any = {
    recurring: 'Yes',
    title: '',
    start_date_time: '',
    hasScheduleData: false,
    hasMoreDetailsData: false,
    hasTicketingData: false,
    hasPublishingData: false
  }

  constructor(
    private checkSessionEventData: EventSideMenuCheckService
  ) { }

  ngOnInit(): void {
    this.getCreatedEvent()
    console.log(this.event.recurring)
    this.event.hasMoreDetailsData = this.checkSessionEventData.eventHasMoreDetailsData()
    this.event.hasScheduleData = this.checkSessionEventData.eventHasScheduleData()
    this.event.hasTicketingData = this.checkSessionEventData.eventHasTicketingData()
    this.event.hasPublishingData = this.checkSessionEventData.eventHasPublishingData()

    // console.log(this.event)

  }

  getCreatedEvent(): void {
        
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.event.recurring = data.event[0].recurring;
    this.event.title = data.event[0].title
    this.event.start_date_time = data.event[0].start_date_time

    // console.log(data)
      
  }

  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A')
  }

  getEventTime(date: any) {
    return moment(date).format('h:mm A')

  }

  

  switchTheme() {
    
    if(!this.dark_theme) {
      console.log(document.body.setAttribute('class', 'dark-theme'))
      this.dark_theme = true;

      
    } else {
      console.log(document.body.removeAttribute('class'))
      this.dark_theme = false;

    }
  
  }

  hideSideMenu() {
    
      $('#side_bar').attr('class', 'sidenav slide-left');
    
  }

}
