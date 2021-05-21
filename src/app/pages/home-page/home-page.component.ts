import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { BannerAdsService } from 'src/app/services/banner-ads/banner-ads.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  
  bannerAdsData: any = [];
  eventsNow: any = [];

  constructor(
    private eventService: EventsService,
    private bannerService: BannerAdsService
  ) { }

  ngOnInit(): void {
    this.getBannerAds();
    this.getEventsHappeningNow();
  }

  getBannerAds(): void {
    this.bannerService.getBannerAds().then(
      res => {
        console.log(res);
        this.bannerAdsData = res.banner_ads;
      },
      err => {
        console.log(err);
      }
    );
  }

  getEventsHappeningNow(): void {
    this.eventService.getEventsHappeningNow().then(
      res => {
        console.log(res);
        this.eventsNow = res.event.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
