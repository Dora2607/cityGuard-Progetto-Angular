import { Injectable } from '@angular/core';
import { UsersListService } from './users-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersViewService {
  deleteButtonClicked = new Subject<boolean>();

  constructor(private usersListService: UsersListService) {}

  updateStatus(newStatus: string) {
    const users = this.usersListService.getDisplayedUsers();
    const updatedUsers =
      newStatus === 'all'
        ? [...users]
        : users.filter((user) => user.status === newStatus);
    this.usersListService.setDisplayedUsers(updatedUsers);
  }

  updateUsersCount(count: number) {
    const users = this.usersListService.getDisplayedUsers();
    this.usersListService.setDisplayedUsers(users.slice(0, count));
  }
}
