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
    console.log(this.url)
  }

  submit() {
    if (this.url.includes('usersManagement')) {
      if (this.search !== '') {
        this.usersList = this.usersListService.searchUsers(this.search);
        this.usersListService.displayedUsersChanged.next(this.usersList);
      } else {
        const fullList = this.usersListService.getDisplayedUsers();
        this.usersListService.displayedUsersChanged.next(fullList);
      }
    }

    if (this.url.includes('postsOverview')) {
      if (this.search !== '') {
        this.postsList = this.postsService.searchPosts(this.search);
        this.searchBarService.submitClick();
        this.postsService.displayedPostsChanged.next(this.postsList);
      } else {
        const fullList = this.postsService.getDispayedPosts();
        this.postsService.displayedPostsChanged.next(fullList);
      }
    }
  }

  endSearch() {
    this.showSearchBar = false;

    if (this.url.includes('usersManagement')) {
      const fullList = this.usersListService.getDisplayedUsers();
      this.usersListService.displayedUsersChanged.next(fullList);
    }
    if (this.url.includes('postsOverview')) {
      const fullList = this.postsService.getDispayedPosts();
      this.postsService.displayedPostsChanged.next(fullList);
    }
    this.search = '';
  }
}
