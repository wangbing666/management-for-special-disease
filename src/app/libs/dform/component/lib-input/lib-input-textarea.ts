import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormTextarea } from '../../_entity/form-textarea';

@Component({
  selector: 'app-input-textarea',
  template: `
    <div [formGroup]="form">
      <mat-form-field *ngIf="!data.maxlength" style="width: 100%" floatPlaceholder="always">
        <textarea matInput [attr.row]="data.size"
                  [placeholder]="data.label" [formControlName]="data.key"
                  [(ngModel)]="value" (change)="change()" (keyup)="change()">
        </textarea>
        <mat-error>{{data.errMsg}}</mat-error>
      </mat-form-field>
      <mat-form-field *ngIf="data.maxlength" style="width: 100%" floatPlaceholder="always">
        <textarea matInput [maxlength]="data.maxlength" [attr.row]="data.size"
                  [placeholder]="data.label" [formControlName]="data.key"
                  [(ngModel)]="value" (change)="change()" (keyup)="change()">
        </textarea>
        <mat-error>{{data.errMsg}}</mat-error>
        <mat-hint align="end">{{value.length}} / {{data.maxlength}}</mat-hint>
      </mat-form-field>
    </div>
  `
})
export class LibInputTextareaComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormTextarea;
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
