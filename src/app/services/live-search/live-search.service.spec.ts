import { TestBed } from '@angular/core/testing';

import { LiveSearchService } from './live-search.service';

describe('LiveSearchService', () => {
  let service: LiveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
