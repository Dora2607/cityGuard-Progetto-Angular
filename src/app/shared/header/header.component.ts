import { Component } from '@angular/core';
import { LogoService } from '../../services/logo.service';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private logoService: LogoService,
    private store: Store,
    private searchBarService: SearchBarService,
  ) {
    this.logoService.isToolbar = true;
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  toggleSearchBar() {
    this.searchBarService.show();
  }
}
