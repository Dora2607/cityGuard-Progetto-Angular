import { TestBed } from '@angular/core/testing';
import { LoggedUserService } from './logged-user.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('LoggedUserService', () => {
  let service: LoggedUserService;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select']);
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: mockStore }],
    });
    service = TestBed.inject(LoggedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return logged user', () => {
    const loggedUser = {
      id: 1,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'active',
    };

    mockStore.select.and.returnValue(of(loggedUser));
    service.getLoggedInUser().subscribe((user) => {
      expect(user).toEqual(loggedUser);
    });
  });

});
