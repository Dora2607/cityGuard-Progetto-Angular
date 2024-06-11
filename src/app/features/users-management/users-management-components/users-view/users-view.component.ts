import { Component, OnInit } from '@angular/core';
import { UsersViewService } from '../../../../services/users-view.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss',
})
export class UsersViewComponent implements OnInit {
  status = 'All';
  usersShowCount = 35;
  isAddUserClicked: boolean = true; 
  isDeleteBtnClicked: boolean = false;
  toggleUserView!: boolean; 

  constructor(
    private usersViewService:UsersViewService,
  ){}

  ngOnInit(): void {
    this.usersViewService.currentToggleUsersView.subscribe(
      (toggleComponent) => (this.toggleUserView = toggleComponent)
    )
  }

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

  onaddUser(): void {
    this.isAddUserClicked = true;
    this.usersViewService.setToggleUsersView(this.toggleUserView);
    this.usersViewService.addUserButtonClicked.next(this.isAddUserClicked);
  }

  deleteButton(): void {
    this.isDeleteBtnClicked = !this.isDeleteBtnClicked;
    this.usersViewService.deleteButtonClicked.next(this.isDeleteBtnClicked);
  }

}
