import { TestBed } from '@angular/core/testing';

import { PublishingService } from './publishing.service';

describe('PublishingService', () => {
  let service: PublishingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
