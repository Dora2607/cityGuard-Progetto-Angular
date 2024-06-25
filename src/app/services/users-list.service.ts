import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private allUsers: Users[] = [];
  private displayedUsers: Users[] = [];
  isFirstVisit = true;

  allUsersChanged = new BehaviorSubject<Users[]>([]);
  displayedUsersChanged = new BehaviorSubject<Users[]>([]);

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private postsService: PostsService) {}

  setAllUsers(users: Users[]) {
    this.allUsers = users;
    this.allUsersChanged.next(this.allUsers.slice());
    this.setDisplayedUsers(users);
  }

  setDisplayedUsers(displayedUsers: Users[]) {
    this.displayedUsers = displayedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  getDisplayedUsers() {
    return this.allUsers.slice();
  }

  addUser(user: Users) {
    this.allUsers.unshift(user);
    this.displayedUsersChanged.next(this.allUsers.slice());
  }

  deleteUser(id: number) {
    this.allUsers = this.allUsers.filter((user) => user.id !== id);
    this.displayedUsersChanged.next(this.allUsers.slice());
    this.postsService.removePosts(id);
  }
}
