import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersViewComponent } from './users-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersViewService } from '../../../../services/users-view.service';


describe('UsersViewComponent', () => {
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;
  let usersViewService: UsersViewService;
  
  let updateStatusSpy:jasmine.Spy;
  let updateUsersCountSpy: jasmine.Spy;
  let deleteButtonClickedSpy: jasmine.Spy;

  beforeEach(async () => {
    const usersListServiceSpy = jasmine.createSpyObj('UsersListService', ['getDisplayedUsers', 'setDisplayedUsers']);
    usersViewService = new UsersViewService(usersListServiceSpy);
    updateStatusSpy = spyOn(usersViewService, 'updateStatus');
    updateUsersCountSpy = spyOn(usersViewService, 'updateUsersCount');
    deleteButtonClickedSpy = spyOn(usersViewService.deleteButtonClicked, 'next');
    await TestBed.configureTestingModule({
      declarations: [UsersViewComponent],
      imports:[BrowserAnimationsModule, SharedModule ],
      providers: [
        { provide: UsersViewService, useValue: usersViewService },
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateStatus on usersViewService with new status when onStatusUpdate is called', ()=>{
    const status = 'active';
    component.onStatusUpdate(status);
    expect(updateStatusSpy).toHaveBeenCalledWith(status);
  });

  it('should call updateUsersCount on usersViewService with new status when onUsersUpdated is called', ()=>{
    const count = 10;
    component.onUsersUpdated(count);
    expect(updateUsersCountSpy).toHaveBeenCalledWith(count);
  });

  it('should call next on deleteButtonClicked of usersViewService with new isDeleteBtnClicked when deleteButton is called',()=>{
    component.deleteButton();
    expect(deleteButtonClickedSpy).toHaveBeenCalledWith(component.isDeleteBtnClicked);
  });


});
