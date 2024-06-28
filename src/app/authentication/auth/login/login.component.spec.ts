import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { login } from '../../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dispatchSpy = storeSpy.dispatch; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check the form is invalid', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });


  it('should validate form', () => {
    component.loginForm.controls['email'].setValue(
      'john@example.com',
    );
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should dispatch login action when login is called with valid form', () => {
    const email = 'test@test.com';
    const password = 'password';

    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(
      login({
        email: email,
        password: password,
      }),
    );
  });
});
