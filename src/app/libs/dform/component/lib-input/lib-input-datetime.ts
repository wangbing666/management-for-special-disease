import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as laydate from 'layui-laydate/';
import { FormDatetime } from '../../_entity/form-datetime';

@Component({
  selector: 'app-input-datetime',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content"
               [placeholder]="data.placeholder"
               [formControlName]="data.key"
               [(ngModel)]="value"
               #datetime
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputDatetimeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() data: FormDatetime;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('datetime') datetime: ElementRef;

  datePicker: any;

  constructor(
    @Inject('app') private app,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    laydate.path = `${this.app.base}assets/`;
    this.datePicker = laydate.render({
      elem: this.datetime.nativeElement,
      type: 'datetime',
      range: this.data.options == 'range',
      value: this.value,
      done: (value, date, endDate) => {
        this.value = value;
        this.cdr.detectChanges();
        this.valueChange.emit(this.value);
      }
    });
  }

  ngOnDestroy() {
    this.datePicker = null;
  }
}
