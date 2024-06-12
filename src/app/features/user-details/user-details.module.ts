import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { UserProfileComponent } from './user-details-components/user-profile/user-profile.component';
import { UserPostsComponent } from './user-details-components/user-posts/user-posts.component';
import { CommentsComponent } from './user-details-components/comments/comments.component';

@NgModule({
  declarations: [
    UserDetailsComponent,
    UserProfileComponent,
    UserPostsComponent,
    CommentsComponent,
  ],
  imports: [CommonModule, UserDetailsRoutingModule, SharedModule],
  exports: [
    UserDetailsComponent,
    UserProfileComponent,
    UserPostsComponent,
    CommentsComponent,
  ],
})
export class UserDetailsModule {}
