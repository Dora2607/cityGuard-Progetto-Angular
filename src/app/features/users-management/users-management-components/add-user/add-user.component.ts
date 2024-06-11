import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users, newUser } from '../../../../models/users.model';
import { UsersViewService } from '../../../../services/users-view.service';
import { ApiService } from '../../../../services/api.service';
import { UsersListService } from '../../../../services/users-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{

  public addUserForm!: FormGroup;
  toggleUserView!: boolean;  

  addNewUser: newUser = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };

  constructor(
    private usersViewService: UsersViewService,
    private apiService: ApiService,
    private usersListService:UsersListService,
    private router: Router,

  ){}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.usersViewService.currentToggleUsersView.subscribe(
      (toggleComponent) => (this.toggleUserView = toggleComponent)
    )
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
  
    this.apiService.addUser(this.addNewUser).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response: any) => {
        alert('User added successfully');
        const newUser = response as Users;
        this.usersListService.addUser(newUser);
        this.usersViewService.setToggleUsersView(this.toggleUserView);
        this.router.navigate(['features/usersManagement']);
      },
    );
  }

  goBack(event: Event) {
    event.preventDefault();
    this.usersViewService.setToggleUsersView(this.toggleUserView);
    this.router.navigate(['features/usersManagement']);
  }


}
