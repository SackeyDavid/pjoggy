import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-event-schedules',
  templateUrl: './edit-event-schedules.component.html',
  styleUrls: ['./edit-event-schedules.component.scss']
})
export class EditEventSchedulesComponent implements OnInit {

  isLoading: boolean;
  
  eventTitle: string = ''
  eventDate: string = ''
  
  constructor(private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time
    // console.log(data.event[0].title)
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
