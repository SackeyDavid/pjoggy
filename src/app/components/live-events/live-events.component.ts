import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.scss']
})
export class LiveEventsComponent implements OnInit {

  sliderOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.sliderOptions = {
      items: 1,
      dots: true,
      margin: 30,
      center: true,
      loop: true
    };
  }

}
