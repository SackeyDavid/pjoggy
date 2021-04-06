import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-create-event-schedules',
  templateUrl: './create-event-schedules.component.html',
  styleUrls: ['./create-event-schedules.component.scss']
})
export class CreateEventSchedulesComponent implements OnInit {

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
    this.router.navigateByUrl('/create_event/basic_info');
  }

  save() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/create_event/more_details');
    }, 3500);
  }

}
