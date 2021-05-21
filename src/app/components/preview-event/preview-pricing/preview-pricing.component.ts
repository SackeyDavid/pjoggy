import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-pricing',
  templateUrl: './preview-pricing.component.html',
  styleUrls: ['./preview-pricing.component.scss']
})
export class PreviewPricingComponent implements OnInit {

  @Input() pricing?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
