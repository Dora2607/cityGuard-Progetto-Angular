import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comments } from '../../../../models/comments.model';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId!: number;
  comments: Comments[] = [];
  private commentsSubscription!: Subscription;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.comments = this.commentsService.getComments(this.postId);
    if (this.comments.length === 0) {
      this.commentsService.fetchComments(this.postId);
    }
    this.commentsSubscription = this.commentsService.commentsChanged.subscribe(
      (comments: { [postId: number]: Comments[] }) => {
        this.comments = comments[this.postId] || [];
      },
    );
  }
  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }
}
