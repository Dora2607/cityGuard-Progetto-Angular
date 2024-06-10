import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, LogoComponent],
})
export class SharedModule {}
