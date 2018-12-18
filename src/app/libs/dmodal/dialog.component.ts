import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

import { DialogOptions } from './dialog.entity';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>{{option.title}}</h1>
    <div mat-dialog-content>
      {{option.message}}
      <div *ngIf="option.forms.length!=0">
        <mat-form-field *ngFor="let item of option.forms" style="width: 100%">
          <textarea matInput [placeholder]="item.label" [(ngModel)]="item.value"></textarea>
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions style="float: right;">
      <div style="margin: 20px 0">
        <button *ngFor="let btn of option.buttons" color="{{btn.color}}" mat-raised-button style="margin-left: 15px"
                (click)="dialogRef.close({key:btn.key,value:option.forms || ''})">
          {{btn.value}}
        </button>
      </div>
    </div>
  `
})
export class DialogComponent {
  option: DialogOptions = new DialogOptions();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.option = this.data;
  }
}

export function HintDialog(msg, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: new DialogOptions(
      {
        title: '提示信息',
        message: msg,
        buttons: [{
          key: 'confirm',
          value: '确定',
          color: 'primary'
        }]
      }),
    width: '300px'
  };
  return dialog.open(DialogComponent, option);
}

export function MessageDialog(title, msg, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: new DialogOptions(
      {
        title: title,
        message: msg,
        buttons: [{
          key: 'comfirm',
          value: '确定',
          color: ''
        }]
      }),
    width: '300px'
  };
  return dialog.open(DialogComponent, option);
}

export function ActionDialog(config: DialogOptions, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: config,
    width: '500px'
  };
  return dialog.open(DialogComponent, option);
}
