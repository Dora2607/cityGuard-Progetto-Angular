import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { slideInOutAnimation } from '../Animations/slideInOut-animation';
import { Users } from '../../models/users.model';
import { Posts } from '../../models/posts.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [slideInOutAnimation],
})
export class SearchBarComponent{
  showSearchBar = false;
  search!: string;
  usersList: Users[] = [];
  postsList: Posts[] = [];

  constructor(
    private searchBarService: SearchBarService,
  ) {
    this.searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }

  submit() {
    this.searchBarService.search(this.search);
  }

  endSearch() {
    this.searchBarService.search('');
    this.showSearchBar = false;
  }
}
