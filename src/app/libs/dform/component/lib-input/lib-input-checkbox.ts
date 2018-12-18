import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormCheckbox } from '../../_entity/form-checkbox';

@Component({
  selector: 'app-input-checkbox',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <section calss="input_content">
          <mat-checkbox class="check_content"
                       *ngFor="let opt of data.options"
                       [(checked)]="opt.checked"
                       (change)="getChecked($event, opt.id)"
          >{{opt.name}}
          </mat-checkbox>
        </section>
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputCheckboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormCheckbox;
  @Input() value: Array<any>;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('date') date: any;

  constructor() {
  }

  ngOnInit() {
    this.data.options.forEach(obj => {
      if (this.value.indexOf(obj.id) > -1) {
        obj.checked = true;
      }
    });
  }

  getChecked(opt, id) {
    let index = this.value.indexOf(id);
    if (opt.checked) {
      if (index = -1) {
        this.value.push(id);
      }
    } else {
      if (index > -1) {
        this.value.splice(index, 1);
      }
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
