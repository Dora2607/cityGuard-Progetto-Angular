import { TestBed } from '@angular/core/testing';
import { SearchBarService } from './search-bar.service';

describe('SearchBarService', () => {
  let service: SearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit event when show is called', (done) => {
    service.show$.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    service.show();
  });

  it('should update searchTerm when search is called', (done) => {
    const term = 'test';
    let firstCall = true;
    service.searchTerm.subscribe((value) => {
      if (firstCall) {
        firstCall = false;
      } else {
        expect(value).toEqual(term);
        done();
      }
    });
    service.search(term);
  });
});
