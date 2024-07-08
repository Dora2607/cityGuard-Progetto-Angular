import { Injectable } from '@angular/core';
import { Posts } from '../models/posts.model';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private allPosts: Posts[] = [];
  private displayedPosts: Posts[] = [];

  allPostsChanged = new BehaviorSubject<Posts[]>([]);
  displayedPostsChanged = new BehaviorSubject<Posts[]>([]);

  isFirstVisit = true;

  private personalPosts: Posts[] = [];
  personalPostChanged = new BehaviorSubject<Posts[]>([]);

  constructor(private apiService: ApiService) {}

  setAllPosts(posts: Posts[]) {
    this.allPosts = posts;
    this.allPostsChanged.next(this.allPosts.slice());
    this.setDisplayedPosts(this.allPosts);
  }

  setDisplayedPosts(displayedPosts: Posts[]) {
    this.displayedPosts = displayedPosts;
    this.displayedPostsChanged.next(this.displayedPosts.slice());
  }

  getDispayedPosts() {
    return this.allPosts.slice();
  }

  getAllPosts(userIds: number[]): Observable<Posts[]> {
    return forkJoin(userIds.map((id) => this.apiService.getPosts(id))).pipe(
      map((arrays) => arrays.flat()),
    );
  }

  addPersonalPost(post: Posts) {
    this.allPosts.unshift(post);
    this.displayedPostsChanged.next(this.allPosts.slice());
    this.personalPosts.push(post);
    this.personalPostChanged.next(this.personalPosts.slice());
  }

  removePosts(id: number) {
    this.allPosts = this.allPosts.filter((post) => post.user_id !== id);
    this.displayedPosts = this.displayedPosts.filter(
      (post) => post.user_id !== id,
    );
    this.allPostsChanged.next(this.allPosts.slice());
    this.displayedPostsChanged.next(this.displayedPosts.slice());
  }
}
