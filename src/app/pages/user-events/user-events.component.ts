import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { BasicInfoService } from 'src/app/services/basic-info/basic-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  userEvents: any;

  constructor(
    private router: Router,
    private eventsService: EventsService, 
    private basicInfoService: BasicInfoService
  ) { }

  ngOnInit(): void {    
    this.getUserEvents();
  }

  getUserEvents(): void {
    this.eventsService.getUserEvents(0).then(
      res => {
        console.log(res);
        this.userEvents = res.all_events.data;
      },
      err => {
        console.log(err);
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

}
