import { NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { DFormModule } from '../dform/dform.module';
import { DialogEditComponent } from './dialog-edit.component';

export * from './dialog-edit.component';

@NgModule({
  imports: [
    MatDialogModule,
    DFormModule
  ],
  declarations: [
    DialogEditComponent
  ],
  entryComponents: [
    DialogEditComponent
  ],
  exports: [
    DFormModule,
    MatDialogModule,
    DialogEditComponent,
  ],
  providers: [
    MatDialog
  ]
})
export class LibDialogEditModule {
}
