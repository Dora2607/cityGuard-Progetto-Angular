import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (
      route.canMatch === undefined &&
      route.data?.['preload'] &&
      route.path != null
    ) {
      this.preloadedModules.push(route.path);

      return load();
    } else {
      return of(null);
    }
  }
}
