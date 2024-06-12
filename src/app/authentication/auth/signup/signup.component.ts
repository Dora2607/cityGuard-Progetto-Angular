import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LogoService } from '../../../services/logo.service';

import { Subject } from 'rxjs';
import { register } from '../../../state/auth/auth.actions';
import { fadeInOutAnimation } from '../../../shared/Animations/fadeInOut-animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: '../authentication.scss',
  animations: [ fadeInOutAnimation ]
})
export class SignupComponent implements OnInit, OnDestroy {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';
  public signupForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private logoService: LogoService,
    private router: Router,
  ) {
    this.logoService.isToolbar = false;
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.store.dispatch(
        register({
          name: this.signupForm.value.name,
          gender: this.signupForm.value.gender,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        }),
      );
    }
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
