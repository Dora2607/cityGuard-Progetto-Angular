import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Store } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { register } from '../../../state/auth/auth.actions';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: Store;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [FormsModule, ReactiveFormsModule, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = storeSpy.dispatch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate signup form', () => {
    component.signupForm.controls['name'].setValue('John Doe');
    component.signupForm.controls['gender'].setValue('Male');
    component.signupForm.controls['email'].setValue('john.doe@example.com');
    component.signupForm.controls['password'].setValue('password');
  
    expect(component.signupForm.valid).toBeTruthy();
  });
  
  it('should dispatch register action when signup is called with valid form', () => {
    const name = 'John Doe';
    const gender = 'Male';
    const email = 'john.doe@example.com';
    const password = 'password';
  
    component.signupForm.controls['name'].setValue(name);
    component.signupForm.controls['gender'].setValue(gender);
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue(password);
  
    component.signup();
  
    expect(dispatchSpy).toHaveBeenCalledWith(
      register({
        name: name,
        gender: gender,
        email: email,
        password: password,
      })
    );
  });
});
