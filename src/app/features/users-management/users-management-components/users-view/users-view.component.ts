import { Component } from '@angular/core';
import { UsersViewService } from '../../../../services/users-view.service';
import { fadeInOutAnimation } from '../../../../shared/Animations/fadeInOut-animation';


@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss',
  animations: [fadeInOutAnimation]
})
export class UsersViewComponent  {
  status = 'All';
  usersShowCount = 35;
  isDeleteBtnClicked: boolean = false;
   

  constructor(
    private usersViewService:UsersViewService,
  ){}

  onStatusUpdate(newStatus: string): void {
    this.status = newStatus;
    this.usersViewService.updateStatus(newStatus);
    if (this.status === 'all') {
      this.status = 'All';
    } else if (this.status === 'active') {
      this.status = 'Online';
    } else {
      this.status = 'Offline';
    }
  }

  onUsersUpdated(count: number): void {
    this.usersShowCount = count;
    this.usersViewService.updateUsersCount(count);
  }


  deleteButton(): void {
    this.isDeleteBtnClicked = !this.isDeleteBtnClicked;
    this.usersViewService.deleteButtonClicked.next(this.isDeleteBtnClicked);
  }

}
