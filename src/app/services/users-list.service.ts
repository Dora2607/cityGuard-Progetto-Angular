import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private allUsers: Array<Users> = [];
  private displayedUsers: Array<Users> = [];
  isFirstVisit:boolean = true;

  allUsersChanged = new BehaviorSubject<Array<Users>>([]);
  displayedUsersChanged = new BehaviorSubject<Array<Users>>([]);

  isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  setAllUsers(users: Array<Users>) {
    this.allUsers = users;
    this.allUsersChanged.next(this.allUsers.slice());
    this.setDisplayedUsers(users);
  }

  setDisplayedUsers(displayedUsers: Array<Users>) {
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

  resetAllUsers(){
    return this.isFirstVisit = true 
  }

  deleteUser(id: number) {
    this.allUsers = this.allUsers.filter((user) => user.id !== id);
    this.displayedUsersChanged.next(this.allUsers.slice());
    // this.postsService.removePosts(id); da aggiungere in seguito
  }


}
