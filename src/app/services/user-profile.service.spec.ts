import { TestBed } from '@angular/core/testing';
import { UserProfileService } from './user-profile.service';
import { UsersListService } from './users-list.service';
import { Users } from '../models/users.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserProfileService', () => {
  let service: UserProfileService;

  let usersListServiceSpy: jasmine.SpyObj<UsersListService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('usersList', ['getDisplayedUsers']);
    TestBed.configureTestingModule({
      providers: [
        UserProfileService,
        { provide: UsersListService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserProfileService);

    usersListServiceSpy = TestBed.inject(
      UsersListService,
    ) as jasmine.SpyObj<UsersListService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', () => {
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
    usersListServiceSpy.getDisplayedUsers.and.returnValue(dummyUsers);
    service.getUser(1).subscribe((user) => {
      expect(user).toEqual(dummyUsers[0]);
    });
  });

  it('should get id by array of Users', () => {
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
    usersListServiceSpy.getDisplayedUsers.and.returnValue(dummyUsers);
    const ids = service.getIds(dummyUsers);
    expect(ids).toEqual([1, 2]);
  });

  it('should get a user description', () => {
    const description = service.getUserDescription();
    expect(typeof description).toEqual('string');
    expect(service.userDescriptions.includes(description)).toBeTrue();
  });

  it('should emit updated user', () => {
    const dummyUser: Users = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      gender: 'Male',
      status: 'Active',
    };
    service.emitUpdateUser(dummyUser);
    service.currentUser.subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });
  });

});
