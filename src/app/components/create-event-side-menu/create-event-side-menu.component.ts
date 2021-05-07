declare var $: any;
import moment from 'moment';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher/theme-switcher.service';
import { EventSideMenuCheckService } from 'src/app/services/event-side-menu-check/event-side-menu-check.service';

@Component({
  selector: 'app-create-event-side-menu',
  templateUrl: './create-event-side-menu.component.html',
  styleUrls: ['./create-event-side-menu.component.scss']
})
export class CreateEventSideMenuComponent implements OnInit {

  event: any;
  @Input() currentPage: any;
  dark_theme: boolean = false;

  dropdown_shown: boolean = false;

  _global_page_objects = this;

  constructor(
    private checkSessionEventData: EventSideMenuCheckService
  ) {
    this.event = {
      title: '',
      recurring: '',
      start_date_time: '',
      hasScheduleData: false,
      hasMoreDetailsData: false,
      hasTicketingData: false,
      hasPublishingData: false
    };
    
    this.getCreatedEvent();
    this.toggleAdvancedSettings();
   }

  toggleAdvancedSettings() {
    var _local_page_objects = this._global_page_objects;

    $(document).ready(function(){

      $('#advanced-dropdown').click(
        function () {
          //show its submenu
          if (_local_page_objects.dropdown_shown) {
            $('.sidenav').attr('style', 'overflow-y: hidden'); 
            $('.dropdown-container').attr('style', 'display: none');  
            _local_page_objects.dropdown_shown = false;
          } 
          else {
            $('.sidenav').attr('style', 'overflow-y: scroll'); 
            $('.dropdown-container').attr('style', 'display: block');  
            _local_page_objects.dropdown_shown = true;
          }  
        }
      );
    });

    this._global_page_objects = _local_page_objects;
  }

  ngOnInit(): void {
    console.log(this.event.recurring);
    this.event.hasMoreDetailsData = this.checkSessionEventData.eventHasMoreDetailsData();
    this.event.hasScheduleData = this.checkSessionEventData.eventHasScheduleData();
    this.event.hasTicketingData = this.checkSessionEventData.eventHasTicketingData();
    this.event.hasPublishingData = this.checkSessionEventData.eventHasPublishingData();

    console.log(this.event);

    this.toggleOpenSideNav();

  }

  toggleOpenSideNav() {
    if (this.currentPage == 'organizers' || this.currentPage == 'media' || this.currentPage == 'sponsors' || this.currentPage == 'speakers') {
      $('.sidenav').attr('style', 'overflow-y: scroll'); 
      $('.dropdown-container').attr('style', 'display: block');  
      this._global_page_objects.dropdown_shown = true;
    } 
    else {
      // $('.sidenav').attr('style', 'overflow-y: hidden'); 
      // $('.dropdown-container').attr('style', 'display: none');  
      // this._global_page_objects.dropdown_shown = false;
    } 
  }

  getCreatedEvent(): void {
    var localStore: any =  sessionStorage.getItem('created_event');
    var data = JSON.parse(localStore);
    this.event.recurring = data.event[0].recurring;
    this.event.title = data.event[0].title;
    this.event.start_date_time = data.event[0].start_date_time;

    console.log(this.event.start_date_time);
  }

  getEventStartDateFormatted(date: any) {
    return moment(date).format('ddd, MMM D, YYYY h:mm A');
  }

  getEventTime(date: any) {
    return moment(date).format('h:mm A');
  }


  switchTheme() {
    if(!this.dark_theme) {
      console.log(document.body.setAttribute('class', 'dark-theme'));
      this.dark_theme = true;
    }
    else {
      console.log(document.body.removeAttribute('class'));
      this.dark_theme = false;
    }
  }

  hideSideMenu() {
    $('#side_bar').attr('class', 'sidenav slide-left');
  }


}
