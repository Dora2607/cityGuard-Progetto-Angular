import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../../models/users.model';
import { Posts } from '../../../../models/posts.model';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../../../services/user-profile.service';
import { Subscription } from 'rxjs';
import { fadeInOutAnimation } from '../../../../shared/Animations/fadeInOut-animation';
import { newComments } from '../../../../models/comments.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';
import { PostsService } from '../../../../services/posts.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
  animations: [fadeInOutAnimation],
})
export class UserPostsComponent implements OnInit, OnDestroy {
  userId!: string;
  loggedUser!: Users;
  posted: Posts[] = [];
  userProfile!: Users;
  isEmptyPostsArr = false; // valutare come inserire a meglio questa variabile
  isComponentVisible: Record<number, boolean> = {};
  addCommentBox: Record<number, boolean> = {};
  commentForm!: FormGroup;
  userSubscription!: Subscription;

  constructor(
    private loggedUserService: LoggedUserService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userProfileService: UserProfileService,
    private commentsService: CommentsService,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.loggedUserService.initializePersonalProfile();
    this.userId = this.route.snapshot.params['id'];
    this.userSubscription = this.userProfileService.currentUser.subscribe(
      (user: Users) => {
        this.userProfile = user;
      },
    );
    this.updatedPosts(+this.userId);
    this.initializeCommentForm();
  }

  updatedPosts(id: number) {
    if (id !== this.loggedUser.id) {
      this.apiService.getPosts(id).subscribe((posts: Posts[]) => {
        this.posted = posts;
        this.lengthPosts(this.posted);
      });
    } else {
      this.postsService.personalPostChanged.subscribe((posts: Posts[]) => {
        this.posted = posts;
        this.lengthPosts(this.posted);
      });
    }
  }

  lengthPosts(posts: Posts[]) {
    if (posts.length != 0) {
      this.isEmptyPostsArr = false;
    } else {
      this.isEmptyPostsArr = true;
    }
    this.userProfileService.emitUpdateNumPost(posts.length);
  }

  initializeCommentForm() {
    this.commentForm = new FormGroup({
      commentText: new FormControl('', Validators.required),
    });
  }

  //toggle the visibility of the comments and add comment box for a specific post ID
  toggleComments(id: number) {
    this.isComponentVisible[id] = !this.isComponentVisible[id];
  }

  toggleAddComments(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }

  // Add new Comments
  addNewComment: newComments = {
    name: '',
    email: '',
    body: '',
  };

  addComment(id: number) {
    this.addNewComment = {
      name: this.loggedUser.name,
      email: this.loggedUser.email,
      body: this.commentForm.get('commentText')?.value,
    };

    this.apiService
      .addComments(id, this.addNewComment)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((comment: any) => {
        alert('Comment added successfully');
        const newComments = [...this.commentsService.getComments(id), comment];
        this.commentsService.setComments(id, newComments);
        this.commentForm.reset({ commentText: '' });
        this.commentForm.get('commentText')?.markAsUntouched();
        if (this.isComponentVisible[id]) {
          this.toggleAddComments(id);
        } else {
          this.toggleAddComments(id);
          this.toggleComments(id);
        }
      });
  }
  goBack(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
