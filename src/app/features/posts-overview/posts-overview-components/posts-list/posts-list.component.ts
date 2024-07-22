import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../../models/users.model';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { ApiService } from '../../../../services/api.service';
import { Subscription } from 'rxjs';
import { fadeInOutAnimation } from '../../../../shared/Animations/fadeInOut-animation';
import { newComments } from '../../../../models/comments.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';
import { Posts } from '../../../../models/posts.model';
import { UsersListService } from '../../../../services/users-list.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { PostsService } from '../../../../services/posts.service';
import { SearchBarService } from '../../../../services/search-bar.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  animations: [fadeInOutAnimation],
})
export class PostsListComponent implements OnInit, OnDestroy {
  loggedUser!: Users;

  users: Users[] = [];
  usersId: number[] = [];
  posts: Posts[] = [];
  displayedPosts: Posts[] = [];
  userProfiles: Record<number, string> = {};
  postsSubscription!: Subscription;

  isComponentVisible: Record<number, boolean> = {};
  addCommentBox: Record<number, boolean> = {};
  commentForm!: FormGroup;
  isLoading = false;
  isLoadingSubscription!: Subscription;
  searchPostsList!: Subscription;

  constructor(
    private loggedUserService: LoggedUserService,
    private usersListService: UsersListService,
    private userProfileService: UserProfileService,
    private postsService: PostsService,
    private apiService: ApiService,
    private commentsService: CommentsService,
    private searchBarService: SearchBarService,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.loggedUserService.initializePersonalProfile();
    this.users = this.usersListService.getDisplayedUsers();
    this.usersId = this.userProfileService.getIds(this.users);

    if (this.postsService.isFirstVisit) {
      this.getAllPosts(this.usersId);
      this.postsService.isFirstVisit = false;
    } else {
      this.posts = this.postsService.getDispayedPosts();
    }

    this.postsSubscription = this.postsService.displayedPostsChanged.subscribe(
      (posts: Posts[]) => {
        this.posts = posts;
        this.userProfiles = this.initializeUsersProfiles(this.posts);
      },
    );

    this.isLoadingSubscription = this.usersListService.isLoading.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      },
    );

    this.initializeCommentForm();

    this.searchBarService.searchTerm.subscribe((term: string) => {
      const allPosts = this.postsService.getDispayedPosts();
      if (allPosts) {
        this.displayedPosts = allPosts.filter((post: Posts) =>
          post.title.toLowerCase().includes(term),
        );
        this.postsService.setDisplayedPosts(this.displayedPosts);
      }
    });
  }

  getAllPosts(usersId: number[]) {
    this.usersListService.isLoading.next(true);
    this.postsService.getAllPosts(usersId).subscribe((posts) => {
      this.postsService.setAllPosts(posts);
      this.postsService.setDisplayedPosts([...posts]);
      this.userProfiles = this.initializeUsersProfiles(this.posts);
      this.usersListService.isLoading.next(false);
    });
  }

  initializeUsersProfiles(posts: Posts[]): Record<number, string> {
    const userProfiles: Record<number, string> = {};
    posts.forEach((post) => {
      const user = this.users.find((user) => user.id === post.user_id);
      if (user) {
        userProfiles[post.user_id] = user.name;
      }
    });
    return userProfiles;
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
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.searchPostsList) {
      this.searchPostsList.unsubscribe();
    }
  }
}
