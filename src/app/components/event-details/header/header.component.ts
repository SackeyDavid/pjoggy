import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() intro?: Boolean;
  @Input() speakers?: Boolean;
  @Input() schedule?: Boolean;
  @Input() pricing?: Boolean;
  @Input() organisers?: Boolean;
  @Input() sponsors?: Boolean;
  @Input() direction?: Boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
