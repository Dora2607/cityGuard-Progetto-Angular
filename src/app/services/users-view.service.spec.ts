import { TestBed } from '@angular/core/testing';
import { UsersViewService } from './users-view.service';
import { UsersListService } from './users-list.service';
import { Users } from '../models/users.model';

describe('UsersViewService', () => {
  let service: UsersViewService;
  let usersListService: jasmine.SpyObj<UsersListService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UsersListService', [
      'getDisplayedUsers',
      'setDisplayedUsers',
    ]);
    TestBed.configureTestingModule({
      providers: [
        UsersViewService,
        { provide: UsersListService, useValue: spy },
      ],
    });
    service = TestBed.inject(UsersViewService);
    usersListService = TestBed.inject(
      UsersListService,
    ) as jasmine.SpyObj<UsersListService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setDisplayedUsers with updated users when updateStatus is called', () => {
    const status = 'Active';
    const dummyUsers: Users[] = [
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        gender: 'Male',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Test User 2',
        email: 'test2@example.com',
        gender: 'Male',
        status: 'Inactive',
      },
    ];
    const updatedUsers = dummyUsers.filter(
      (user) => user.status === status,
    );
    usersListService.getDisplayedUsers.and.returnValue(dummyUsers);
    service.updateStatus(status);
    expect(usersListService.setDisplayedUsers).toHaveBeenCalledWith(
      updatedUsers,
    );
  });

  it('should call setDisplayedUsers with sliced users when updateUsersCount is called', () => {
    const count = 1;
    const dummyUsers: Users[] = [
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        gender: 'Male',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Test User 2',
        email: 'test2@example.com',
        gender: 'Male',
        status: 'Inactive',
      },
      {
        id: 3,
        name: 'Test User 3',
        email: 'test3@example.com',
        gender: 'Male',
        status: 'Active',
      },
    ];
  const updatedUsersCount = dummyUsers.slice(0, count);
  usersListService.getDisplayedUsers.and.returnValue(dummyUsers);
  service.updateUsersCount(count);
  expect(usersListService.setDisplayedUsers).toHaveBeenCalledWith(updatedUsersCount);
  });

});
