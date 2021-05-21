import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-event-page',
  templateUrl: './preview-event-page.component.html',
  styleUrls: ['./preview-event-page.component.scss']
})
export class PreviewEventPageComponent implements OnInit {

  dataUrl: string;

  dataContent: any;
  eventContent: any;
  speakersContent: any;
  scheduleContent: any;
  pricingContent: any;
  organisersContent: any;
  sponsorsContent: any;
  galleryContent: any;
  hostingContent: any;

  eventDisplay: Boolean = false;
  speakersDisplay: Boolean = false;
  scheduleDisplay: Boolean = false;
  pricingDisplay: Boolean = false;
  organisersDisplay: Boolean = false;
  sponsorsDisplay: Boolean = false;
  galleryDisplay: Boolean = false;

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
          this.galleryContent = this.dataContent.images;
          this.hostingContent = this.dataContent.hosted_on_links;

          console.log(this.hostingContent);

          this.displayOptions();
        },
        err => {
          console.log(err)
        }
      );
  }

  displayOptions(){
    if (Object.keys(this.pricingContent)?.length > 0) this.pricingDisplay = true;
    if (Object.keys(this.eventContent)?.length > 0) this.eventDisplay = true;
    if (Object.keys(this.speakersContent)?.length > 0) this.speakersDisplay = true;
    if (Object.keys(this.scheduleContent)?.length > 0) this.scheduleDisplay = true;
    if (Object.keys(this.organisersContent)?.length > 0) this.organisersDisplay = true;
    if (Object.keys(this.sponsorsContent)?.length > 0) this.sponsorsDisplay = true;
    if (Object.keys(this.galleryContent)?.length > 0) this.galleryDisplay = true;
    
    console.log({
      speakers: this.speakersDisplay,
      schedule: this.scheduleDisplay,
      pricing: this.pricingDisplay,
      organizers: this.organisersDisplay,
      sponsors: this.sponsorsDisplay,
      gallery: this.galleryDisplay
    });
  }

  gotoIntro() {
    console.log('going to intro...');
    document.querySelector('#intro')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoSpeakers() {
    console.log('going to speakers...');
    document.querySelector('#speakers')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoSchedule() {
    console.log('going to schedule...');
    document.querySelector('#schedule')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoPricing() {
    console.log('going to pricing...');
    document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoOrganizers() {
    console.log('going to organizers...');
    document.querySelector('#organizers')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoSponsors() {
    console.log('going to sponsors...');
    document.querySelector('#sponsors')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoGallery() {
    console.log('going to gallery...');
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
  }

}
