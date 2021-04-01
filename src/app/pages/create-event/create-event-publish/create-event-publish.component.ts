import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-publish',
  templateUrl: './create-event-publish.component.html',
  styleUrls: ['./create-event-publish.component.scss']
})
export class CreateEventPublishComponent implements OnInit {

  isLoading: boolean;

  constructor(private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  previous() {
    this.router.navigateByUrl('/create_event/ticketing');
  }

  publish() {
    console.log('publish');
  }

}
