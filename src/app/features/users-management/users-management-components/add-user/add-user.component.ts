import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users, newUser } from '../../../../models/users.model';
import { ApiService } from '../../../../services/api.service';
import { UsersListService } from '../../../../services/users-list.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  public addUserForm!: FormGroup;

  addNewUser: newUser = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };

  constructor(
    private apiService: ApiService,
    private usersListService: UsersListService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  fullName() {
    const name =
      this.addUserForm.value.firstName + ' ' + this.addUserForm.value.lastName;
    return name;
  }

  randomStatus() {
    const status = ['active', 'inactive'];
    const random = Math.floor(Math.random() * status.length);
    return status[random];
  }

  newUser() {
    this.addNewUser = {
      name: this.fullName(),
      email: this.addUserForm.value.email,
      gender: this.addUserForm.value.gender,
      status: this.randomStatus(),
    };

    this.apiService
      .addUser(this.addNewUser)
      .pipe(
        tap((response) => {
          const newUser = response as Users;
          this.usersListService.addUser(newUser);
          this.router.navigate(['features/usersManagement']);
        }),
        catchError((error) => {
          if (error.status === 422) {
            alert(
              'An user with this email already exists. Please choose a different email.',
            );
          }
          throw error;
        }),
      )
      .subscribe();
  }

  goBack(event: Event) {
    event.preventDefault();
    this.router.navigate(['features/usersManagement']);
  }
}
