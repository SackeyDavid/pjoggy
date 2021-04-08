import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-publish',
  templateUrl: './create-event-publish.component.html',
  styleUrls: ['./create-event-publish.component.scss']
})
export class CreateEventPublishComponent implements OnInit {

  isLoading: boolean;

  eventTitle: string = ''
  eventDate: string = ''

  constructor(private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time
    
  }

  previous() {
    this.router.navigateByUrl('/create_event/ticketing');
  }

  publish() {
    console.log('publish');
  }

}
