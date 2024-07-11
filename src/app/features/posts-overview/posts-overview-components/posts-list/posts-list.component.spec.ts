import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListComponent } from './posts-list.component';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { PostsOverviewModule } from '../../posts-overview.module';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListService } from '../../../../services/users-list.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { PostsService } from '../../../../services/posts.service';
import { ApiService } from '../../../../services/api.service';
import { CommentsService } from '../../../../services/comments.service';
import { SearchBarService } from '../../../../services/search-bar.service';
import { BehaviorSubject, of } from 'rxjs';
import { Posts } from '../../../../models/posts.model';
import { FormControl, FormGroup } from '@angular/forms';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  let loggedUserServiceSpy: jasmine.SpyObj<LoggedUserService>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersListServiceSpy: jasmine.SpyObj<UsersListService>;
  let userProfilesServiceSpy: jasmine.SpyObj<UserProfileService>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let commentsServiceSpy: jasmine.SpyObj<CommentsService>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let searchBarServiceSpy: jasmine.SpyObj<SearchBarService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('LoggedUserService', [
      'initializePersonalProfile',
    ]);
    const spy2 = jasmine.createSpyObj('UsersListService', [
      'getDisplayedUsers',
    ]);
    const spy3 = jasmine.createSpyObj('UserProfileService', ['getIds']);
    const spy4 = jasmine.createSpyObj('PostsService', [
      'getDispayedPosts',
      'setDisplayedPosts',
      'getAllPosts',
      'setAllPosts',
    ]);
    const spy5 = jasmine.createSpyObj('ApiService', ['addComments']);
    const spy6 = jasmine.createSpyObj('CommentsService', [
      'getComments',
      'setComments',
    ]);
    const spy7 = jasmine.createSpyObj('SearchBarService', ['search']);

    spy4.displayedPostsChanged = new BehaviorSubject<Posts[]>([]);
    spy2.isLoading = new BehaviorSubject<boolean>(false);
    spy7.searchTerm = new BehaviorSubject<string>('');

    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      imports: [BrowserAnimationsModule, SharedModule, PostsOverviewModule],
      providers: [
        { provide: LoggedUserService, useValue: spy1 },
        { provide: UsersListService, useValue: spy2 },
        { provide: UserProfileService, useValue: spy3 },
        { provide: PostsService, useValue: spy4 },
        { provide: ApiService, useValue: spy5 },
        { provide: CommentsService, useValue: spy6 },
        { provide: SearchBarService, useValue: spy7 },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    loggedUserServiceSpy = TestBed.inject(
      LoggedUserService,
    ) as jasmine.SpyObj<LoggedUserService>;
    usersListServiceSpy = TestBed.inject(
      UsersListService,
    ) as jasmine.SpyObj<UsersListService>;
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
    searchBarServiceSpy = TestBed.inject(
      SearchBarService,
    ) as jasmine.SpyObj<SearchBarService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loggedUser on ngOnInit', () => {
    const loggedUser = {
      id: 1,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'Active',
    };
    loggedUserServiceSpy.initializePersonalProfile.and.returnValue(loggedUser);
    component.ngOnInit();
    expect(component.loggedUser).toEqual(loggedUser);
  });

  it('should get all posts on ngOnInit if it is the first visit', () => {
    postsServiceSpy.isFirstVisit = true;
    const userIds = [1, 2, 3];
    userProfilesServiceSpy.getIds.and.returnValue(userIds);
    const posts = [
      {
        id: 139915,
        user_id: 7015124,
        title: 'Defaeco in carbo decet audeo volutabrum corroboro.',
        body: 'Ultio cattus patrocinor. Sint cubitum vapulus. Valetudo tertius excepturi. Convoco delego sollers. Supellex antepono admoveo. Culpa appello deleniti. Aro dolores certo. Avaritia testimonium degero. Vir culpa temeritas. Vel modi theca. Voluptas vado error. Abduco sulum desipio. Suffoco quibusdam spiritus. Ea convoco velit.',
      },
      {
        id: 139914,
        user_id: 7015123,
        title: 'Summa aliquid accedo qui admoneo cognomen victus.',
        body: 'Omnis et repellendus. Comminor utpote bonus. Acquiro veritas odio. Ut apud cursus. Depraedor amet cilicium. Vel doloribus pecto. Fuga cedo creta. Virgo qui aegre. Agnosco usque sint. Complectus advenio beneficium. Textus creo sint. Suppono curiositas delectus. Vero nobis altus. Charisma callide occaecati. Cur aliquam derideo. Teres despecto conqueror.',
      },
    ];
    postsServiceSpy.getAllPosts.and.returnValue(of(posts));

    component.ngOnInit();

    expect(postsServiceSpy.getAllPosts).toHaveBeenCalledWith(userIds);
    expect(postsServiceSpy.setAllPosts).toHaveBeenCalledWith(posts);
    expect(postsServiceSpy.setDisplayedPosts).toHaveBeenCalledWith(posts);
  });

  it('should add a new comment', () => {
    const id = 1;
    const commentText = 'Test comment';
    component.commentForm = new FormGroup({
      commentText: new FormControl(commentText),
    });
    const loggedUser = {
      id: 0,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'Active',
    };
    component.loggedUser = loggedUser;

    const newComment = {
      name: loggedUser.name,
      email: loggedUser.email,
      body: commentText,
    };

    const existingComments = [
      {
        id: 110193,
        post_id: 140184,
        name: 'Ms. Menaka Guha',
        email: 'guha_menaka_ms@altenwerth.test',
        body: 'Similique unde ad. Est aut ut.',
      },
    ];

    const personalComment = {
      id: 1,
      post_id: 140184,
      name: loggedUser.name,
      email: loggedUser.email,
      body: 'Test comment',
    };

    apiServiceSpy.addComments.and.returnValue(of(personalComment));

    commentsServiceSpy.getComments.and.returnValue(existingComments);

    component.addComment(id);

    expect(apiServiceSpy.addComments).toHaveBeenCalledWith(id, newComment);
    expect(commentsServiceSpy.setComments).toHaveBeenCalledWith(id, [
      ...existingComments,
      personalComment,
    ]);
  });
});
