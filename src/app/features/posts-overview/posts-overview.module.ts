import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsOverviewRoutingModule } from './posts-overview-routing.module';
import { PostsOverviewComponent } from './posts-overview.component';
import { PostsListComponent } from './posts-overview-components/posts-list/posts-list.component';
import { AddPostComponent } from './posts-overview-components/add-post/add-post.component';

import { UserDetailsModule } from '../user-details/user-details.module';

@NgModule({
  declarations: [PostsOverviewComponent, PostsListComponent, AddPostComponent],
  imports: [
    CommonModule,
    PostsOverviewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    UserDetailsModule
  ],
  exports: [PostsOverviewComponent, PostsListComponent, AddPostComponent],
})
export class PostsOverviewModule {}
