import { TestBed } from '@angular/core/testing';

import { UsersFavoritesService } from './users-favorites.service';

describe('UsersFavoritesService', () => {
  let service: UsersFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
