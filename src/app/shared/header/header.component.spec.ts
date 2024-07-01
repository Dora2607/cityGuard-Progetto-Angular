import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared.module';
import { LogoService } from '../../services/logo.service';
import { SearchBarService } from '../../services/search-bar.service';

import { ActivatedRoute, convertToParamMap } from '@angular/router';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dispatchSpy: jasmine.Spy;
  let searchBarService: SearchBarService;
  let showSpy: jasmine.Spy

   beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    searchBarService = new SearchBarService();
    showSpy = spyOn(searchBarService, 'show');
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: LogoService, useValue: { isToolbar: true } },
        {
          provide: Store,
          useValue: storeSpy,
        },
        {
          provide: SearchBarService,
          useValue: searchBarService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dispatchSpy = storeSpy.dispatch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on store when logout is called', () => {
    component.logout();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should call show on searchBarService when toggleSearchBar is called', () => {
    component.toggleSearchBar();
    expect(showSpy).toHaveBeenCalled();
  });
});

