import { TestBed } from '@angular/core/testing';

import { UsersListServiceService } from './users-list.service';

describe('UsersListServiceService', () => {
  let service: UsersListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
