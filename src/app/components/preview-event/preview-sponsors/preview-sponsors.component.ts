import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-sponsors',
  templateUrl: './preview-sponsors.component.html',
  styleUrls: ['./preview-sponsors.component.scss']
})
export class PreviewSponsorsComponent implements OnInit {

  @Input() sponsors?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
