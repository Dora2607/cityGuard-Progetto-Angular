import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { LogoService } from '../../services/logo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let logoService: LogoService;

  beforeEach(async () => {
    logoService = new LogoService();
    await TestBed.configureTestingModule({
      declarations: [LogoComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: LogoService, useValue: logoService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get isToolbar value from logoService', () => {
    logoService.isToolbar = true;
    expect(component.isToolbar).toBeTrue();
  });


});
