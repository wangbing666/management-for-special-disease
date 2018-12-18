import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';

// declare var require;
// const flatpickr = require('flatpickr');
import flatpickr from 'flatpickr';
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';

@Component({
  selector: 'app-input-time',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content"
               [placeholder]="data.placeholder"
               [formControlName]="data.key"
               [(ngModel)]="value"
               (change)="change()" #time
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputTimeComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('time') time: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const date = flatpickr(this.time.nativeElement, {
      'locale': Mandarin,
      'enableTime': true,
      'time_24hr': true,
      'noCalendar': true,
      'defaultDate': this.value || ''
    });
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
