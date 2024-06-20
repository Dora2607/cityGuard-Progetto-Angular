import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private _show = new Subject<void>();
  show$ = this._show.asObservable();

  sumbitClicked = false;
  submitClick$ = new Subject<void>();


  routeChanged = new Subject<string>();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.routeChanged.next(event.urlAfterRedirects);
      });
  }


  show() {
    this._show.next();
  }

  submitClick() {
    this.sumbitClicked = true;
    this.submitClick$.next();
  }
}
