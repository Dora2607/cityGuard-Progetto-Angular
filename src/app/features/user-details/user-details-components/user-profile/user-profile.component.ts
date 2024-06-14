import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../../../models/users.model';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ApiService } from '../../../../services/api.service';
import { Todos } from '../../../../models/todos.model';
import { fadeInOutAnimation } from '../../../../shared/Animations/fadeInOut-animation';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  animations: [fadeInOutAnimation],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId!: string;
  userProfile!: Users;
  randomDescription: string = '';
  userSubscription!: Subscription;
  numPostSubscription!: Subscription;
  postNumber: number = 0;
  todos: Array<Todos> = [];

  constructor(
    private route: ActivatedRoute,
    private loggedUserService: LoggedUserService,
    private userProfileService: UserProfileService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById(+this.userId);
    this.numPostSubscription =
      this.userProfileService.currentPostNumber.subscribe((num: number) => {
        this.postNumber = num;
      });
    this.updatedTodos(+this.userId);
  }

  getUserById(id: number) {
    this.userSubscription = this.userProfileService
      .getUser(id)
      .subscribe((user) => {
        this.userProfile = user;
        this.userProfileService.emitUpdateUser(this.userProfile);
        this.randomDescription = this.userProfileService.getUserDescription();
      });
  }

  updatedTodos(id: number) {
    this.apiService.getTodos(id).subscribe((todos: Array<Todos>) => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
