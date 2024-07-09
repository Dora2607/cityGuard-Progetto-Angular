import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../../../services/api.service';
import { PostsService } from '../../../../services/posts.service';
import { of } from 'rxjs';
import { Posts } from '../../../../models/posts.model';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let loggedUserServiceSpy: jasmine.SpyObj<LoggedUserService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('LoggedUserService', [
      'initializePersonalProfile',
    ]);
    const spy2 = jasmine.createSpyObj('ApiService', ['addPosts']);
    const spy3 = jasmine.createSpyObj('PostsService', ['addPersonalPost']);
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ApiService,
          useValue: spy2,
        },
        {
          provide: PostsService,
          useValue: spy3,
        },
        {
          provide: LoggedUserService,
          useValue: spy1,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    loggedUserServiceSpy = TestBed.inject(
      LoggedUserService,
    ) as jasmine.SpyObj<LoggedUserService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    postsServiceSpy = TestBed.inject(
      PostsService,
    ) as jasmine.SpyObj<PostsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize post form on init', () => {
    const loggedUser = {
      id: 1,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'Active',
    };
    loggedUserServiceSpy.initializePersonalProfile.and.returnValue(loggedUser);
    component.ngOnInit();
    expect(component.loggedInUser).toEqual(loggedUser);
    expect(component.postForm.get('postTitle')).not.toBeNull();
    expect(component.postForm.get('postText')).not.toBeNull();
  });

  it('should add post', ()=>{
    const newPost= { title: 'Test Title', body: 'Test Body' };
    const loggedUser = {
      id: 1,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'Active',
    };
    const returnedPost: Posts = {
      id: 1,
      user_id: 1,
      title: 'Test Title',
      body: 'Test Body'
    };
    loggedUserServiceSpy.initializePersonalProfile.and.returnValue(loggedUser);
    apiServiceSpy.addPosts.and.returnValue(of(returnedPost));
    component.ngOnInit();
    component.postForm.setValue({ postTitle: newPost.title, postText: newPost.body });
    component.addPost(loggedUser.id);
    expect(apiServiceSpy.addPosts).toHaveBeenCalledWith(loggedUser.id, newPost);
    expect(postsServiceSpy.addPersonalPost).toHaveBeenCalledWith(returnedPost);
  })

  it('should toggle add post box visibility', () => {
    component.showAddPostBox();
    expect(component.toggleVisibility).toBeTrue();
    expect(component.toggleIcon).toBeFalse();
    component.showAddPostBox();
    expect(component.toggleVisibility).toBeFalse();
    expect(component.toggleIcon).toBeTrue();
  });

  it('should close add post box', () => {
    component.closeBox();
    expect(component.toggleVisibility).toBeTrue();
    expect(component.toggleIcon).toBeFalse();
  });

});
