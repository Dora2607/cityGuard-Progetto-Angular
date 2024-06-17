import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [LogoComponent, HeaderComponent, SearchBarComponent, NotFoundComponent],
  imports: [CommonModule, MaterialModule, FormsModule, SharedRoutingModule],
  exports: [MaterialModule, LogoComponent, HeaderComponent, SearchBarComponent],
})
export class SharedModule {}
