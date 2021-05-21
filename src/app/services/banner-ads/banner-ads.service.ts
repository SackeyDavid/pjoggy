import { Injectable } from '@angular/core';
import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BannerAdsService {

  private headers: HttpHeaders;
  createBannerAdUrl: string;
  editBannerAdUrl: string;
  getBannerAdsUrl: string;
  

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) 
    {

    this.headers = this.endpoint.headers();
    this.createBannerAdUrl = this.endpoint.apiHost + '/v1/create_banner';
    this.editBannerAdUrl = this.endpoint.apiHost + '/v1/edit_banner/';
    this.getBannerAdsUrl = this.endpoint.apiHost + '/get_todays_banners'; 
    
  }

  getBannerAds(): Promise<any> {
    return new Promise((resolve, reject) => {
      let banner_ads: any[] = [];
      const url = this.getBannerAdsUrl;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_banner_ads_ok: ', res);
          banner_ads = res;
          resolve(banner_ads);
        },
        err => {
          console.log('get_banner_ads_error: ', err);
          reject(err);
        }
      );
    });
  }

}
