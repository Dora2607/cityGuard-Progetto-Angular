// da rivedere  o cancellare

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userProfileServiceSpy: jasmine.SpyObj<UserProfileService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const userProfileSpy = jasmine.createSpyObj('userProfileService', [
      'getUser',
      'emitUpdateUser',
      'getUserDescription',
    ]);
    const apiSpy = jasmine.createSpyObj('apiService', ['getTodos']);

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: UserProfileService, useValue: userProfileSpy },
        { provide: ApiService, useValue: apiSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userProfileServiceSpy = TestBed.inject(
      UserProfileService,
    ) as jasmine.SpyObj<UserProfileService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute,
    ) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserById on ngOnInit', () => {
    component.ngOnInit();
    expect(component.getUserById).toHaveBeenCalled();
  });


  it('should call getUser and set userProfile and randomDescription', () => {
    const user = {
      id: 1,
      name: 'User 1',
      email: 'user@one.test',
      gender: 'male',
      status: 'active',
    };
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    userProfileServiceSpy.getUser.and.returnValue(of(user));

    component.ngOnInit();
    expect(userProfileServiceSpy.getUser).toHaveBeenCalledWith(1);
    expect(component.userProfile).toEqual(user);
    expect(userProfileServiceSpy.emitUpdateUser).toHaveBeenCalledWith(user);
    userProfileServiceSpy.getUserDescription.and.returnValue(description);

    
  });

  it('should call updateTodos', () => {
    const todos = [
      {
        id: 2,
        user_id: 1,
        title: 'Lorem ipsum dolor',
        due_on: new Date('2024-07-16T00:00:00.000+05:30'),
        status: 'pending',
      },
    ];

    const userId = 1;
    apiServiceSpy.getTodos.and.returnValue(of(todos));
    component.ngOnInit();
    expect(apiServiceSpy.getTodos).toHaveBeenCalledWith(userId);
  });
});
