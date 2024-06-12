import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UsersListService } from './users-list.service';

@Injectable({
  providedIn: 'root',
})
export class UsersViewService {
  deleteButtonClicked = new Subject<boolean>();

  constructor(private usersListService: UsersListService) {}

  updateStatus(newStatus: string) {
    let users = this.usersListService.getDisplayedUsers();
    let updatedUsers =
      newStatus === 'all'
        ? [...users]
        : users.filter((user) => user.status === newStatus);
    this.usersListService.setDisplayedUsers(updatedUsers);
  }

  updateUsersCount(count: number) {
    let users = this.usersListService.getDisplayedUsers();
    this.usersListService.setDisplayedUsers(users.slice(0, count));
  }
}
