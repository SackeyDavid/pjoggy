import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-schedules',
  templateUrl: './create-event-schedules.component.html',
  styleUrls: ['./create-event-schedules.component.scss']
})
export class CreateEventSchedulesComponent implements OnInit {

  isLoading: boolean;

  constructor(private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
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
