import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  
  userId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId)
  }

}
