import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared.module';
import { LogoService } from '../../services/logo.service';
import { SearchBarService } from '../../services/search-bar.service';
import { HttpTestingController } from '@angular/common/http/testing';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dispatchSpy: jasmine.Spy;
  
  let searchBarService: SearchBarService;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: LogoService, useValue: { isToolbar: true } },
        {
          provide: Store,
          useValue: storeSpy,
        },
        
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    searchBarService = TestBed.inject(SearchBarService);
    dispatchSpy = storeSpy.dispatch;
    httpMock = TestBed.inject(HttpTestingController);
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
    expect(searchBarService.show).toHaveBeenCalled();
  });
});

