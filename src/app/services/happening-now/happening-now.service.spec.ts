import { TestBed } from '@angular/core/testing';

import { HappeningNowService } from './happening-now.service';

describe('HappeningNowService', () => {
  let service: HappeningNowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappeningNowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
