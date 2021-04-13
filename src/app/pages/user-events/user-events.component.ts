import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  eventId: any;
  userEvents: any;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventId = data.event[0].id;

    this.getUserEvents();
  }

  getUserEvents(): void {
    this.eventsService.getUserEvents(this.eventId, 0).then(
      res => {
        console.log(res);
        this.userEvents = res.all_events;
      },
      err => {
        console.log(err);
      }
    );
  }

}
