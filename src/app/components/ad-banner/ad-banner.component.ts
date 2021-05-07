import { Component, OnInit } from '@angular/core';
import { BannerAdsService } from 'src/app/services/banner-ads/banner-ads.service';
declare var $: any;

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent implements OnInit {

  sliderOptions: any;
  bannerAdsData: any;

  constructor(
    private bannerService: BannerAdsService
  )
  { 
    // this.bannerAdsData = [];
    // $(document).ready(function(){
    //   $('.onzoom-homepage-total').slick({
    //     dots: true,
    //     autoplay: true,
    //     // nextArrow: $('.next'),
    //     // prevArrow: $('.prev'),
    //   });
    // });

  }

  ngOnInit(): void {
    
    this.getBannerAds();  

    this.sliderOptions = {
      items: 1,
      // dots: true,
      nav: true,
      margin: 30,
      center: true,
      loop: true,
      autoplay: true
    };

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

}
