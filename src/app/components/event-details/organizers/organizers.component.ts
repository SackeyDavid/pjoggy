import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss']
})
export class OrganizersComponent implements OnInit {

  @Input() organizers?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
