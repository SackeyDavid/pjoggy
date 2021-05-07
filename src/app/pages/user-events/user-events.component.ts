import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  userEvents: any = [];
  createdEvents: any = [];
  publishedEvents: any = [];
  archivedEvents: any = [];

  loading: boolean = false
  loadIndex = 6
  draft_loadIndex = 6
  published_loadIndex = 6
  archived_loadIndex = 6

  errMsg = '';

  

  constructor(
    private router: Router,
    private eventsService: EventsService, 
    private basicInfoService: BasicInfoService
  ) { }

  ngOnInit() {    
    this.getAllUserEvents();
    this.getUserEvents(0)
    this.getUserEvents(2)
    this.getUserEvents(3)
  }

  getAllUserEvents(): void {
    this.eventsService.getAllUserEvents().then(
      res => {
        console.log(res);
        this.userEvents = res.all_events.data;
        this.userEvents.sort(function(a: any, b:any){
          return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getUserEvents(eventStatus: any): void {
    this.eventsService.getUserEvents(eventStatus).then(
      res => {
        console.log(res);
        if (eventStatus == 0) this.createdEvents = res.all_events.data;
        this.createdEvents.sort(function(a: any, b:any){
          return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
        });


        if (eventStatus == 2) this.publishedEvents = res.all_events.data;
        this.publishedEvents.sort(function(a: any, b:any){
          return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
        });


        if (eventStatus == 3) this.archivedEvents = res.all_events.data;
        this.archivedEvents.sort(function(a: any, b:any){
          return new Date(a.start_date_time).valueOf() - new Date(b.start_date_time).valueOf();
        });


      },
      err => {
        console.log(err);
        return null;
      }
    );
  }

  gotoEdit(eventId: any) {
    console.log(eventId);
    this.saveSelectedEvent(eventId).then(
      ok => {
        if (ok) this.router.navigateByUrl('/edit_event/basic_info')
      },   
    );
  }

  gotoPreview(eventId: any) {
    sessionStorage.setItem('preview_event_id', eventId);
    this.router.navigateByUrl('/event_details');
  }

  saveSelectedEvent(eventId: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.basicInfoService.getCreatedEvent(eventId).then(
        res => {
          console.log(res);
          sessionStorage.removeItem('created_event');
          sessionStorage.setItem('created_event', JSON.stringify(res));
          resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  archiveEvent(eventId: any){
    return new Promise((resolve, reject) => {
      this.eventsService.archiveEvent(eventId).then(
        res => {
          console.log(res);
          // TODO: reload page          
          resolve(true);
        },
        err => {
          console.log(err);
          this.errMsg = err
          reject(err);
        }
      );
    });
  }

  cancelEvent(eventId: any){
    return new Promise((resolve, reject) => {
      this.eventsService.cancelEvent(eventId).then(
        res => {
          console.log(res);
          // TODO: reload page          
          resolve(true);
        },
        err => {
          console.log(err);
          this.errMsg = err
          reject(err);
        }
      );
    });
  }

  recoverEvent(eventId: any){
    return new Promise((resolve, reject) => {
      this.eventsService.recoverEvent(eventId).then(
        res => {
          console.log(res);
          // TODO: reload page          
          resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  getEventDateFormatted(date: any) {
    // return moment(date).format('ddd, MMM D, YYYY h:mm A');
    return moment(date).format('MMM d, YYYY');
  }

  
  loadMore() {
    this.loading = true
    if(this.loadIndex < this.userEvents.length) {
      this.loadIndex += 6
    }
    
    this.loading = false
  }

  loadLess() {
    this.loading = true
    if(this.loadIndex >= this.userEvents.length) {
      this.loadIndex = 6
    }
    
    this.loading = false
  }

  
  loadMoreDrafts() {
    this.loading = true
    if(this.draft_loadIndex < this.createdEvents.length) {
      this.draft_loadIndex += 6
    }
    
    this.loading = false
  }

  loadLessDrafts() {
    this.loading = true
    if(this.draft_loadIndex >= this.createdEvents.length) {
      this.draft_loadIndex = 6
    }
    
    this.loading = false
  }

  
  loadMorePublished() {
    this.loading = true
    if(this.published_loadIndex < this.publishedEvents.length) {
      this.published_loadIndex += 6
    }
    
    this.loading = false
  }

  loadLessPublished() {
    this.loading = true
    if(this.published_loadIndex >= this.publishedEvents.length) {
      this.published_loadIndex = 6
    }
    
    this.loading = false
  }

  loadMoreArchived() {
    this.loading = true
    if(this.archived_loadIndex < this.archivedEvents.length) {
      this.archived_loadIndex += 6
    }
    
    this.loading = false
  }

  loadLessArchived() {
    this.loading = true
    if(this.archived_loadIndex >= this.archivedEvents.length) {
      this.archived_loadIndex = 6
    }
    
    this.loading = false
  }

  showHideMore(event_id: any) {
    var dots = document.getElementById("dots-"+event_id) as HTMLSpanElement;
    var moreText = document.getElementById("more-"+event_id) as HTMLSpanElement;
    var btnText = document.getElementById("myBtn-"+event_id)  as HTMLSpanElement;

    if (dots?.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "See more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "See less"; 
      moreText.style.display = "inline";
    }
  }

  showHideMorePublished(event_id: any) {
    var dots = document.getElementById("published-dots-"+event_id) as HTMLSpanElement;
    var moreText = document.getElementById("published-more-"+event_id) as HTMLSpanElement;
    var btnText = document.getElementById("published-myBtn-"+event_id)  as HTMLSpanElement;

    if (dots?.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "See more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "See less"; 
      moreText.style.display = "inline";
    }
  }

  showHideMoreDraft(event_id: any) {
    var dots = document.getElementById("draft-dots-"+event_id) as HTMLSpanElement;
    var moreText = document.getElementById("draft-more-"+event_id) as HTMLSpanElement;
    var btnText = document.getElementById("draft-myBtn-"+event_id)  as HTMLSpanElement;

    if (dots?.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "See more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "See less"; 
      moreText.style.display = "inline";
    }
  }

  showHideMoreArchived(event_id: any) {
    var dots = document.getElementById("archived-dots-"+event_id) as HTMLSpanElement;
    var moreText = document.getElementById("archived-more-"+event_id) as HTMLSpanElement;
    var btnText = document.getElementById("archived-myBtn-"+event_id)  as HTMLSpanElement;

    if (dots?.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "See more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "See less"; 
      moreText.style.display = "inline";
    }
  }


}
