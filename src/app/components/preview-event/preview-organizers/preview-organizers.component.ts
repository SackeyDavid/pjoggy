import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-organizers',
  templateUrl: './preview-organizers.component.html',
  styleUrls: ['./preview-organizers.component.scss']
})
export class PreviewOrganizersComponent implements OnInit {

  @Input() organizers?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  // cleanText(name: string) {
  //   return name.replace(/ /g,'');
  // }

}
