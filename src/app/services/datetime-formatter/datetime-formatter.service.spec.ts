import { TestBed } from '@angular/core/testing';

import { DatetimeFormatterService } from './datetime-formatter.service';

describe('DatetimeFormatterService', () => {
  let service: DatetimeFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatetimeFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
