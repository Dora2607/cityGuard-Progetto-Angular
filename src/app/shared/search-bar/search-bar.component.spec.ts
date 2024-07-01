import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared.module';
import { SearchBarService } from '../../services/search-bar.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchBarService: SearchBarService;
  let showSpy: jasmine.Spy;

  beforeEach(async () => {
    searchBarService = new SearchBarService();
    showSpy = spyOn(searchBarService, 'search');
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [{ provide: SearchBarService, useValue: searchBarService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search on searchBarService with search term when submit is called', ()=>{
    const term ='test';
    component.search= term;
    component.submit();
    expect(searchBarService.search).toHaveBeenCalledWith(term);
  })

  it('should call search on searchBarService with empty string and hide search bar when endSearch is called', () => {
    component.endSearch();
    expect(showSpy).toHaveBeenCalledWith('');
    expect(component.showSearchBar).toBeFalsy();
  });
});
