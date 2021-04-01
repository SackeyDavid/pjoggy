import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  constructor() { }

  @Input() organizers?: any;
  
  ngOnInit(): void {
  }

}
