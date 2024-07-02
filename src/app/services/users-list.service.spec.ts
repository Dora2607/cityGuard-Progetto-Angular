import { TestBed } from '@angular/core/testing';

import { UsersListService } from './users-list.service';
import { PostsService } from './posts.service';

describe('UsersListService', () => {
  let service: UsersListService;
  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PostsService', ['removePosts']);
    TestBed.configureTestingModule({
      providers: [UsersListService, { provide: PostsService, useValue: spy }],
    });

    service = TestBed.inject(UsersListService);
    postsService = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set all users', () => {
    const users = [
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
    service.setAllUsers(users);
    expect(service.getDisplayedUsers()).toEqual(users);
  });

  it('should set displayed users', () => {
    const users = [
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
    service.setAllUsers(users);
    expect(service.getDisplayedUsers()).toEqual(users);
  });

  it('should add a user', () => {
    const user = {
      id: 4,
      name: 'Test User 4',
      email: 'test4@example.com',
      gender: 'Male',
      status: 'Active',
    };
    service.addUser(user);
    expect(service.getDisplayedUsers()).toContain(user);
  });

  it('should delete a user', () => {
    const user = {
      id: 4,
      name: 'Test User 4',
      email: 'test4@example.com',
      gender: 'Male',
      status: 'Active',
    };
    service.addUser(user);
    service.deleteUser(user.id);
    expect(service.getDisplayedUsers()).not.toContain(user);
  });

  it('should call removePosts when a user is deleted', () => {
    const user = {
      id: 4,
      name: 'Test User 4',
      email: 'test4@example.com',
      gender: 'Male',
      status: 'Active',
    };
    service.addUser(user);
    service.deleteUser(user.id);
    expect(postsService.removePosts).toHaveBeenCalledWith(user.id);
  });
});
