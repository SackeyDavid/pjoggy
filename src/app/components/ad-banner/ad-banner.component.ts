import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent implements OnInit {

  sliderOptions: any;

  constructor() {
  }

  ngOnInit(): void {
    this.sliderOptions = {
      items: 1,
      dots: true,
      margin: 30,
      center: true,
      loop: true,
      autoplay: true
    };
 }

}
