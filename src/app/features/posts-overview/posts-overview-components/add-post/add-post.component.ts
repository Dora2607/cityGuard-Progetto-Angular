import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../models/users.model';
import { FormControl, FormGroup } from '@angular/forms';
import { newPosts } from '../../../../models/posts.model';
import { ApiService } from '../../../../services/api.service';
import { LoggedUserService } from '../../../../services/logged-user.service';
import { PostsService } from '../../../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit {
  loggedInUser!: Users;
  postForm!: FormGroup;
  toggleVisibility = false;
  toggleIcon = true;
  addedPosts: Record<number, boolean> = {};

  constructor(
    private loggedUserService: LoggedUserService,
    private apiService: ApiService,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.loggedUserService.initializePersonalProfile();
    this.initializeCommentForm();
  }

  initializeCommentForm() {
    this.postForm = new FormGroup({
      postTitle: new FormControl(''),
      postText: new FormControl(''),
    });
  }

  addNewPost: newPosts = {
    title: '',
    body: '',
  };

  addPost(id: number) {
    this.addNewPost = {
      title: this.postForm.get('postTitle')?.value,
      body: this.postForm.get('postText')?.value,
    };

    this.apiService.addPosts(id, this.addNewPost).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (post: any) => {
        alert('Post added successfully');
        this.postsService.addPersonalPost(post);
        this.postsService.addPost(id);
      },
    );
  }

  showAddPostBox() {
    this.toggleVisibility = !this.toggleVisibility;
    this.toggleIcon = !this.toggleIcon;
  }
  closeBox(){
    this.toggleVisibility = !this.toggleVisibility;
    this.toggleIcon = !this.toggleIcon;
  }
}
