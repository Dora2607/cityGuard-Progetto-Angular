import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{

  userId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];
    // console.log(this.userId)
  }

  goToList() {
    this.router.navigate(['features/usersManagement']);
  }

}
