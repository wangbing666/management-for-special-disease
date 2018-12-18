import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-img',
  template: `
    <div style="position: relative">
      <h1 mat-dialog-title>{{option.title}}</h1>
      <div *ngIf="option.desc" style="padding-bottom: 20px">{{option.desc}}</div>
      <div mat-dialog-content>
        <button style="position: absolute;top: 15px;right: 15px" mat-icon-button (click)="rotate()">
          <mat-icon>rotate_right</mat-icon>
        </button>
        <div style="width: 540px;height: 540px;padding: 20px;text-align: center;">
          <img *ngIf="!option.name" [src]="option.image" alt="{{option.title}}"
               [ngStyle]="{'transform': rotateDeg()}">
          <div *ngIf="option.name" style="position: relative;width: 430px;height: 430px;margin: 0 auto;">
            <img [src]="option.image" alt="{{option.title}}"
                 [ngStyle]="{'transform': rotateDeg()}">
            <img src="http://qn.qcxin.com/logo.jpg" alt="" class="avatarUrl">
          </div>
          <div *ngIf="option.name" style="font-size: 24px;">微信扫码向 <span style="font-weight: bold;">{{option.name}}</span> 医生报到</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-img.component.scss']
})
export class DialogImgComponent {
  option: { title: string, image: string, desc: string, name: string } = {title: '', image: '', desc: '', name: ''};
  deg = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogImgComponent>
  ) {
    this.option = this.data;
  }

  rotateDeg() {
    return `rotate(${this.deg}deg)`;
  }

  rotate() {
    this.deg += 90;
  }
}

export function ImageDialog(title, image, dialog, desc?, name?) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: {title: title, image: image, desc: desc || '', name: name || ''}
  };
  return dialog.open(DialogImgComponent, option);
}
