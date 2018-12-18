import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialog, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { DialogImgComponent } from './dialog-img.component';

export * from './dialog.entity';
export * from './dialog.component';
export * from './dialog-img.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    DialogComponent,
    DialogImgComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogImgComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    DialogComponent,
    DialogImgComponent
  ],
  providers: [
    MatDialog
  ]
})
export class LibDialogModule {
}
