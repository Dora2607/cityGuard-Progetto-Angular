import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { CommentsService } from '../../../../services/comments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDetailsModule } from '../../user-details.module';
import { BehaviorSubject, Subject } from 'rxjs';
import { Comments } from '../../../../models/comments.model';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let commentsServiceSpy: jasmine.SpyObj<CommentsService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('CommentsService', [
      'getComments',
      'fetchComments'
    ]);

    spy1.commentsChanged =  new Subject<Record<number, Comments[]>>()
    spy1.isCommentsBoxLoading = new BehaviorSubject<boolean>(false);

    const comments = [
      {
        id: 110194,
        post_id: 140184,
        name: 'Mrs. Bharadwaj Bharadwaj',
        email: 'bharadwaj_mrs_bharadwaj@stoltenberg.example',
        body: 'Tempora minus earum.',
      },
    ];
    spy1.getComments.and.returnValue(comments)

    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [BrowserAnimationsModule, SharedModule, UserDetailsModule],
      providers: [{ provide: CommentsService, useValue: spy1 }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    commentsServiceSpy = TestBed.inject(
      CommentsService,
    ) as jasmine.SpyObj<CommentsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
