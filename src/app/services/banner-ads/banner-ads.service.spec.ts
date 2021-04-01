import { TestBed } from '@angular/core/testing';

import { BannerAdsService } from './banner-ads.service';

describe('BannerAdsService', () => {
  let service: BannerAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
