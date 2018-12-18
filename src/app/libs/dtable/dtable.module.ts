import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { DTableComponent } from './dtable.component';
import { DPageComponent } from './page.component';

export * from './dtable.entity';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    DTableComponent,
    DPageComponent
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DTableComponent,
    DPageComponent
  ]
})
export class DTableModule {
}
