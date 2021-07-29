import { Meta, Title } from '@angular/platform-browser';
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
    private bannerService: BannerAdsService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.getBannerAds();
    this.getEventsHappeningNow();

    this.title.setTitle('Events369 : A marketplace for online events');
    this.meta.updateTag({ name: 'description', content: 'An online events platform featuring free, paid, and fundraising events. Share your expertise with the world, or enjoy new experiences from the comfort of wherever you are.' });
    this.meta.updateTag({ property: "og:image", content: 'https://firebasestorage.googleapis.com/v0/b/semagh-987db.appspot.com/o/Work%2FEvents369%2Fcustomer%20App%2Fmarketing%20space%2Fbanner--202102-birthday.webp?alt=media&token=3c1bc412-f6e5-45fa-8aeb-216c7c480365' });
    this.meta.updateTag({ property: "og:type", content: 'article' });
    this.meta.updateTag({ property: "og:title", content: 'Virtual Events Platform For Hybrid & Virtual Events' });
    this.meta.updateTag({ property: "og:description", content: 'Discover your go-to platform for virtual summits, online conferences & hybrid events. Designed to engage through a custom experience. Try for FREE!' });
    this.meta.updateTag({ property: "og:url", content: 'https://events369.com' });
    this.meta.updateTag({ property: "og:start_time", content: '' });
    
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
        this.eventsNow = res.events?.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
