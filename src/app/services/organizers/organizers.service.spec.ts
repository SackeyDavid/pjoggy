import { TestBed } from '@angular/core/testing';

import { OrganizersService } from './organizers.service';

describe('OrganizersService', () => {
  let service: OrganizersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
