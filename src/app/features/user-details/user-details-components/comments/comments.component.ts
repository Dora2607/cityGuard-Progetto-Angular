import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comments } from '../../../../models/comments.model';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../../services/comments.service';
import { listAnimation } from '../../../../shared/Animations/list-animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations:[listAnimation]
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId!: number;
  comments: Comments[] = [];
  private commentsSubscription!: Subscription;
  isCommentBoxLoading = false;
  isBoxLoadingSubscription!: Subscription;

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
    this.isBoxLoadingSubscription = this.commentsService.isCommentsBoxLoading.subscribe(
      (isLoading:boolean)=>{
        this.isCommentBoxLoading = isLoading;
      }
    )
  }

  
  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
    this.isBoxLoadingSubscription.unsubscribe();
  }
}
