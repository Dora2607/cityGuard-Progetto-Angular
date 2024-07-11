/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsComponent } from './user-posts.component';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { ApiService } from '../../../../services/api.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { CommentsService } from '../../../../services/comments.service';
import { PostsService } from '../../../../services/posts.service';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsModule } from '../../user-details.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../../../../models/users.model';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;
  let loggedUserServiceSpy: jasmine.SpyObj<LoggedUserService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let userProfilesServiceSpy: jasmine.SpyObj<UserProfileService>;
  let commentsServiceSpy: jasmine.SpyObj<CommentsService>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('LoggedUserService', [
      'initializePersonalProfile',
    ]);
    const spy2 = jasmine.createSpyObj('ApiService', [
      'getPosts',
      'addComments',
    ]);
    const spy3 = jasmine.createSpyObj('UserProfileService', [
      'emitUpdateNumPost',
    ]);
    const spy4 = jasmine.createSpyObj('CommentsService', [
      'getComments',
      'setComments',
    ]);
    const spy5 = jasmine.createSpyObj('PostsService', [
      'getDispayedPosts',
      'setDisplayedPosts',
      'getAllPosts',
      'setAllPosts',
    ]);

    spy3.currentUser = new BehaviorSubject<Users>({
      id: 0,
      name: '',
      email: '',
      gender: '',
      status: '',
    });

    await TestBed.configureTestingModule({
      declarations: [UserPostsComponent],
      imports: [BrowserAnimationsModule, SharedModule, UserDetailsModule],
      providers: [
        { provide: LoggedUserService, useValue: spy1 },
        { provide: ApiService, useValue: spy2 },
        { provide: UserProfileService, useValue: spy3 },
        { provide: CommentsService, useValue: spy4 },
        { provide: PostsService, useValue: spy5 },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    loggedUserServiceSpy = TestBed.inject(
      LoggedUserService,
    ) as jasmine.SpyObj<LoggedUserService>;
    userProfilesServiceSpy = TestBed.inject(
      UserProfileService,
    ) as jasmine.SpyObj<UserProfileService>;
    postsServiceSpy = TestBed.inject(
      PostsService,
    ) as jasmine.SpyObj<PostsService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    commentsServiceSpy = TestBed.inject(
      CommentsService,
    ) as jasmine.SpyObj<CommentsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
