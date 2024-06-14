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
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
  animations: [fadeInOutAnimation],
})
export class UserPostsComponent implements OnInit, OnDestroy {
  userId!: string;
  loggedUser!: Users;
  posted: Array<Posts> = [];
  userProfile!: Users;
  isEmptyPostsArr: boolean = false; // valutare come inserire a meglio questa variabile
  isComponentVisible: { [id: number]: boolean } = {};
  addCommentBox: { [id: number]: boolean } = {};
  commentForm!: FormGroup;
  userSubscription!: Subscription;

  constructor(
    private loggedUserService: LoggedUserService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userProfileService: UserProfileService,
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
  ) {
    this.commentForm = this.formBuilder.group({
      commentText: '',
    });
  }

  ngOnInit(): void {
    this.loggedUser = this.loggedUserService.initializePersonalProfile();
    this.userId = this.route.snapshot.params['id'];
    this.userSubscription = this.userProfileService.currentUser.subscribe(
      (user: Users) => {
        this.userProfile = user;
      },
    );
    this.updatedPosts(+this.userId);
  }

  updatedPosts(id: number) {
    if (id !== this.loggedUser.id) {
      this.apiService.getPosts(id).subscribe((posts: Array<Posts>) => {
        this.posted = posts;
        this.lengthPosts(this.posted);
      });
    } else {
      //const personalPost = this.postsService.getPersonalPosts(id);
      console.log('sei nel profilo personale');
      this.lengthPosts(this.posted);
    }
  }

  lengthPosts(posts: Array<Posts>) {
    if (posts.length != 0) {
      this.isEmptyPostsArr = false;
    } else {
      this.isEmptyPostsArr = true;
    }
    this.userProfileService.emitUpdateNumPost(posts.length);
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
      .subscribe((comment: any) => {
        alert('Comment added successfully');
        const newComments = [...this.commentsService.getComments(id), comment];
        this.commentsService.setComments(id, newComments);
        this.commentForm.reset({ commentText: '' });
      });
  }
  goBack(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
