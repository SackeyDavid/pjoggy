import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-side-pane',
  templateUrl: './form-side-pane.component.html',
  styleUrls: ['./form-side-pane.component.scss']
})
export class FormSidePaneComponent implements OnInit {

  constructor() { }

  @Input() primaryText?: String;
  @Input() secondaryText?: String;

  ngOnInit(): void {
  }

}
