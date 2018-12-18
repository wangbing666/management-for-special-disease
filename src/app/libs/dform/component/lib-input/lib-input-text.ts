import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

@Component({
  selector: 'app-input-text',
  template: `
    <div [formGroup]="form">
      <mat-form-field *ngIf="!data.maxlength&&data.type!='password'" style="width: 100%" floatPlaceholder="always">
        <input matInput [type]="data.type"
               [placeholder]="data.label"
               [formControlName]="data.key"
               [(ngModel)]="value"
               [readonly]="data.readonly"
               (keyup)="change()"
               (change)="change()"
               (blur)="change()"
               (focus)="change()"
               (mousedown)="change()"
               autocomplete="off"
        >
        <mat-error>{{data.errMsg}}</mat-error>
      </mat-form-field>
      <mat-form-field *ngIf="!data.maxlength&&data.type=='password'" style="width: 100%" floatPlaceholder="always">
        <input matInput [type]="'text'"
               [placeholder]="data.label"
               [formControlName]="data.key"
               [(ngModel)]="value"
               [readonly]="data.readonly"
               (keyup)="change()"
               (change)="change()"
               (blur)="change()"
               (focus)="change()"
               (mousedown)="change()"
               autocomplete="off"
               onfocus="this.type='password'"
        >
        <mat-error>{{data.errMsg}}</mat-error>
      </mat-form-field>
      <mat-form-field *ngIf="data.maxlength" style="width: 100%" floatPlaceholder="always">
        <input matInput [type]="data.type"
               [maxlength]="data.maxlength"
               [placeholder]="data.label"
               [formControlName]="data.key"
               [(ngModel)]="value"
               [readonly]="data.readonly"
               (keyup)="change()"
               (change)="change()"
               (blur)="change()"
               (focus)="change()"
               (mousedown)="change()"
               autocomplete="off"
        >
        <mat-hint align="end">{{value.length}} / {{data.maxlength}}</mat-hint>
      </mat-form-field>
    </div>
  `
})
export class LibInputTextComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
