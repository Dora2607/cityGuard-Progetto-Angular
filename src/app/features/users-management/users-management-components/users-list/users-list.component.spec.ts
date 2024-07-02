import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { UsersListService } from '../../../../services/users-list.service';
import { ApiService } from '../../../../services/api.service';
import { UsersViewService } from '../../../../services/users-view.service';
import { SearchBarService } from '../../../../services/search-bar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';
import { UsersManagementModule } from '../../users-management.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Users } from '../../../../models/users.model';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  let loggedUserServiceSpy: jasmine.SpyObj<LoggedUserService>;
  let usersListServiceSpy: jasmine.SpyObj<UsersListService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let usersViewServiceSpy: jasmine.SpyObj<UsersViewService>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let searchBarServiceSpy: jasmine.SpyObj<SearchBarService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('LoggedUserService', [
      'initializePersonalProfile',
    ]);
    const spy2 = jasmine.createSpyObj('UsersListService', [
      'setAllUsers',
      'getDisplayedUsers',
      'setDisplayedUsers',
      'addUser',
      'deleteUser',
    ]);
    const spy3 = jasmine.createSpyObj('ApiService', ['getUsers', 'deleteUser']);
    const spy4 = jasmine.createSpyObj('UsersViewService', [
      'deleteButtonClicked',
    ]);
    const spy5 = jasmine.createSpyObj('SearchBarService', ['search']);

    spy2.displayedUsersChanged = new BehaviorSubject<Users[]>([]);
    spy4.deleteButtonClicked = new BehaviorSubject<boolean>(false);
    spy2.isLoading = new BehaviorSubject<boolean>(false);
    spy5.searchTerm = new BehaviorSubject<string>('');

    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [BrowserAnimationsModule, SharedModule, UsersManagementModule],
      providers: [
        { provide: LoggedUserService, useValue: spy1 },
        { provide: UsersListService, useValue: spy2 },
        { provide: ApiService, useValue: spy3 },
        { provide: UsersViewService, useValue: spy4 },
        { provide: SearchBarService, useValue: spy5 },
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

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    loggedUserServiceSpy = TestBed.inject(
      LoggedUserService,
    ) as jasmine.SpyObj<LoggedUserService>;
    usersListServiceSpy = TestBed.inject(
      UsersListService,
    ) as jasmine.SpyObj<UsersListService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    usersViewServiceSpy = TestBed.inject(
      UsersViewService,
    ) as jasmine.SpyObj<UsersViewService>;
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

  it('should call getAllUser if it is the first visit', () => {
    usersListServiceSpy.isFirstVisit = true;
    spyOn(component, 'getAllUser');
    component.ngOnInit();
    expect(component.getAllUser).toHaveBeenCalled();
  });

  it('should call getAllUser if it is not the first visit', () => {
    usersListServiceSpy.isFirstVisit = false;
    spyOn(component, 'getAllUser');
    component.ngOnInit();
    expect(component.getAllUser).not.toHaveBeenCalled();
  });

  it('should update displayedUsers when displayedUsersChanged emits', () => {
    const displayedUsers = [
      {
        id: 1,
        name: 'User 1',
        email: 'user@one.test',
        gender: 'male',
        status: 'Active',
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user@two.test',
        gender: 'female',
        status: 'Active',
      },
    ];
    usersListServiceSpy.displayedUsersChanged.next(displayedUsers);
    expect(component.displayedUsers).toEqual(displayedUsers);
  });

  it('should update isdeleteBtnClicked when deleteButtonClicked emits', () => {
    usersViewServiceSpy.deleteButtonClicked.next(true);
    expect(component.isdeleteBtnClicked).toBeTrue();
  });

  it('should call apiService.getUsers in getAllUser', () => {
    const users = [
      {
        id: 1,
        name: 'User 1',
        email: 'user@one.test',
        gender: 'male',
        status: 'Active',
      },
    ];
    apiServiceSpy.getUsers.and.returnValue(of(users));
    component.getAllUser();
    expect(apiServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('should toggle isdeleteBtnClicked when goToPreviousPage is called', () => {
    component.isdeleteBtnClicked = false;
    component.goToPreviousPage();
    expect(component.isdeleteBtnClicked).toBeTrue();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.usersSubscription, 'unsubscribe');
    spyOn(component.isLoadingSubscription, 'unsubscribe');
    spyOn(component.searchUsersSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.usersSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.isLoadingSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.searchUsersSubscription.unsubscribe).toHaveBeenCalled();
  });
});
