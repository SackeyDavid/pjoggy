import { TestBed } from '@angular/core/testing';

import { EventSideMenuCheckService } from './event-side-menu-check.service';

describe('EventSideMenuCheckService', () => {
  let service: EventSideMenuCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSideMenuCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
