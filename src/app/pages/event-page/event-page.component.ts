import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, AfterViewInit {

  dataUrl: string;

  dataContent: any;
  eventContent: any;
  speakersContent: any;
  scheduleContent: any;
  pricingContent: any;
  organisersContent: any;
  sponsorsContent: any;

  eventDisplay: Boolean = false;
  speakersDisplay: Boolean = false;
  scheduleDisplay: Boolean = false;
  pricingDisplay: Boolean = false;
  organisersDisplay: Boolean = false;
  sponsorsDisplay: Boolean = false;

  constructor(private http: HttpClient) { 
    this.dataUrl = 'http://events369.logitall.biz/api/get_event_data/' + sessionStorage.getItem('preview_event_id');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getData();
  }

  dataCall() {
    return this.http.get(this.dataUrl);
  }

  getData() {
    this.dataCall()
      .subscribe(
        res => {
          console.log(res);
          this.dataContent = res;
          this.eventContent = this.dataContent.event[0];
          this.speakersContent = this.dataContent.hosts;
          this.scheduleContent = this.dataContent.schedule;
          this.pricingContent = this.dataContent.tickets;
          this.organisersContent = this.dataContent.organizers;
          this.sponsorsContent = this.dataContent.sponsors;
  
          console.log(this.eventContent);

          this.displayOptions();
        },
        err => {
          console.log(err)
        }
      );
  }

  displayOptions(){
    if (Object.keys(this.eventContent)?.length > 0) this.eventDisplay = true;
    if (Object.keys(this.speakersContent)?.length > 0) this.speakersDisplay = true;
    if (Object.keys(this.scheduleContent)?.length > 0) this.scheduleDisplay = true;
    if (Object.keys(this.pricingContent)?.length > 0) this.pricingContent = true;
    if (Object.keys(this.organisersContent)?.length > 0) this.organisersDisplay = true;
    if (Object.keys(this.sponsorsContent)?.length > 0) this.sponsorsDisplay = true;
  }

}
