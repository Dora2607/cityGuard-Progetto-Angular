//il test non va, si verificano molti errori--- da cancellare


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { UserDetailsModule } from './user-details.module';
import { AppModule } from '../../app.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsService } from '../../services/posts.service';
import { LoggedUserService } from '../../services/logged-user.service';
import { UserProfileService } from '../../services/user-profile.service';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let router: Router;
  let postsService: PostsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [UserDetailsModule, AppModule, BrowserAnimationsModule],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
              params: of({ id: '1' }),
            },
          },
        },
        {
          provide: LoggedUserService,
          useValue: {
            initializePersonalProfile: () =>
              of({
                id: 1,
                name: 'User 1',
                email: 'user@one.test',
                gender: 'male',
                status: 'active',
              }),
          },
        },
        {
          provide: UserProfileService,
          useValue: {
            currentUser: of({
              id: 1,
              name: 'User 1',
              email: 'user@one.test',
              gender: 'male',
              status: 'active',
            }),
          },
        },
        {
          provide: postsService,
          useValue: {
            getPosts: () => of({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to users management', () => {
    component.goToList();
    expect(router.navigate).toHaveBeenCalledWith(['features/usersManagement']);
  });
});
