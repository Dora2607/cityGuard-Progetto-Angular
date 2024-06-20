import { Injectable } from '@angular/core';
import { Comments } from '../models/comments.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Record<number, Comments[]> = {};
  commentsChanged = new Subject<Record<number, Comments[]>>();
  isCommentsBoxLoading = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  fetchComments(postId: number) {
    this.isCommentsBoxLoading.next(true);
    this.apiService.getComments(postId).subscribe((comments) => {
      this.setComments(postId, comments);
      this.isCommentsBoxLoading.next(false);
    });
  }

  setComments(postId: number, comments: Comments[]) {
    this.comments[postId] = comments;
    this.commentsChanged.next(this.comments);
  }

  getComments(postId: number): Comments[] {
    return this.comments[postId] || [];
  }
  
}
