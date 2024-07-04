import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { ApiService } from '../../../../services/api.service';
import { UsersListService } from '../../../../services/users-list.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let apiService: ApiService;
  let usersListService: UsersListService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', ['addUser']),
        },
        {
          provide: UsersListService,
          useValue: jasmine.createSpyObj('UsersListService', ['addUser']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    usersListService = TestBed.inject(UsersListService);

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compine first and last name', () => {
    component.addUserForm.setValue({
      firstName: 'User',
      lastName: 'One',
      gender: 'male',
      email: 'user.one@example',
    });
    expect(component.fullName()).toEqual('User One');
  });

  it('should generate a random status', () => {
    const status = component.randomStatus();
    expect(['active', 'inactive']).toContain(status);
  });

  it('should create new user', () => {
    component.addUserForm.setValue({
      firstName: 'User',
      lastName: 'One',
      gender: 'male',
      email: 'user.one@example',
    });
    (apiService.addUser as jasmine.Spy).and.returnValue(of({}));
    component.newUser();

    expect(apiService.addUser).toHaveBeenCalledWith(component.addNewUser);
    expect(usersListService.addUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['features/usersManagement']);
  });

  it('should navigate back to user management', () => {
    component.goBack(new Event('click'));
    expect(router.navigate).toHaveBeenCalledWith(['features/usersManagement']);
  });
});
