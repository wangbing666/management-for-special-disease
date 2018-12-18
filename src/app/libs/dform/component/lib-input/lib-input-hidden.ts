import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

@Component({
  selector: 'app-input-hidden',
  template: `
    <div [formGroup]="form" style="width: 0;height: 0;visibility: hidden">
      <input [type]="'hidden'" [formControlName]="data.key" [(ngModel)]="value">
    </div>
  `
})
export class LibInputHiddenComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;

  constructor() {
  }

  ngOnInit() {
  }
}
