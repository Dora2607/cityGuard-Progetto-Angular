import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { slideInOutAnimation } from '../Animations/slideInOut-animation';
import { Users } from '../../models/users.model';
import { Posts } from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [slideInOutAnimation],
})
export class SearchBarComponent implements OnInit {
  showSearchBar = false;
  search!: string;
  url!: string;
  usersList: Users[] = [];
  postsList: Posts[] = [];

  constructor(
    private searchBarService: SearchBarService,
    private postsService: PostsService,
    private usersListService: UsersListService,
  ) {
    this.searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }
  ngOnInit(): void {
    this.url = window.location.href;
  }

  submit() {
    this.searchBarService.search(this.search);
  }

  endSearch() {
    this.searchBarService.search('');
    this.showSearchBar = false;
  }
}
