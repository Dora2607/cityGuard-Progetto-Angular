import { TestBed } from '@angular/core/testing';

import { UsersViewService } from './users-view.service';

describe('UsersViewService', () => {
  let service: UsersViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
