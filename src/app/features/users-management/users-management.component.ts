import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
})
export class UsersManagementComponent {

  isShowUsersView: boolean = true;
  subscription: Subscription | undefined;

  constructor(
    
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isShowUsersView = !event.urlAfterRedirects.includes('addUser');
      }
    });
  }



}
