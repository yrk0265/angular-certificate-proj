import { TestBed } from '@angular/core/testing';

import { UserDetailsListService } from './user-details-list.service';

describe('UserDetailsListService', () => {
  let service: UserDetailsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
