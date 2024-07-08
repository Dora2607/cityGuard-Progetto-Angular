import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { ApiService } from './api.service';
import { Comments } from '../models/comments.model';
import { Subject } from 'rxjs';

describe('CommentsService', () => {
  let service: CommentsService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getComments']);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: spy }],
    });
    service = TestBed.inject(CommentsService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get comments', () => {
    const postId = [140184];
    const mockComments: Comments[] = [
      {
        id: 110194,
        post_id: 140184,
        name: 'Mrs. Bharadwaj Bharadwaj',
        email: 'bharadwaj_mrs_bharadwaj@stoltenberg.example',
        body: 'Tempora minus earum.',
      },
      {
        id: 110193,
        post_id: 140184,
        name: 'Ms. Menaka Guha',
        email: 'guha_menaka_ms@altenwerth.test',
        body: 'Similique unde ad. Est aut ut.',
      },
    ];
    service.setComments(postId[0], mockComments);
    expect(service.getComments(postId[0])).toEqual(mockComments);
  });

  it('should fetch comments', () => {
    const postId = [140184];
    const mockComments: Comments[] = [
      {
        id: 110194,
        post_id: 140184,
        name: 'Mrs. Bharadwaj Bharadwaj',
        email: 'bharadwaj_mrs_bharadwaj@stoltenberg.example',
        body: 'Tempora minus earum.',
      },
      {
        id: 110193,
        post_id: 140184,
        name: 'Ms. Menaka Guha',
        email: 'guha_menaka_ms@altenwerth.test',
        body: 'Similique unde ad. Est aut ut.',
      },
    ];

    const comments$ = new Subject<Comments[]>();
    apiService.getComments.and.returnValue(comments$.asObservable());
    service.fetchComments(postId[0]);
    expect(service.isCommentsBoxLoading.value).toBeTrue();
    comments$.next(mockComments);
    expect(service.getComments(postId[0])).toEqual(mockComments);
    expect(service.isCommentsBoxLoading.value).toBeFalse();
  });
  
});
