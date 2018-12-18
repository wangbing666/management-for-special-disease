import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogEdit } from './dialog.entity';

@Component({
  selector: 'app-dialog-edit',
  template: `
    <h1 mat-dialog-title>{{option.title}}</h1>
    <div mat-dialog-content style="min-width: 320px; width: 50vw">
      <app-form *ngIf="option.form" [formDatas]="option.form" [button]="option.button"
                (formValues)="dialogRef.close($event)"></app-form>
    </div>
  `
})
export class DialogEditComponent {
  option: DialogEdit = new DialogEdit();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditComponent>
  ) {
    console.log(data);
    this.option = this.data;
  }
}

export function EditDialog(option: DialogEdit, dialog) {
  const config: MatDialogConfig = <MatDialogConfig> {
    data: option
  };
  return dialog.open(DialogEditComponent, config);
}
