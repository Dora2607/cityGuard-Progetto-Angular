import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogoComponent, HeaderComponent, SearchBarComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [MaterialModule, LogoComponent, HeaderComponent, SearchBarComponent],
})
export class SharedModule {}
