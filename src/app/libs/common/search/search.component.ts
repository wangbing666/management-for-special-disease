import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';

export enum SearchType {date, range}

@Component({
  selector: 'app-search',
  template: `
    <div class="input_container" style="display: inline-block;width: auto;" *ngIf="type==SearchType.date">
      <input class="input_content"
             [placeholder]=""
             (change)="change()"
             [(ngModel)]="value" #date
      >
      <span class="input_span">{{label}}</span>
    </div>
    <div class="input_container" style="display: inline-block;width: 225px;" *ngIf="type==SearchType.range">
      <input class="input_content"
             [placeholder]=""
             (change)="change()"
             [(ngModel)]="value" #range
      >
      <span class="input_span">{{label}}</span>
    </div>
    <!--<div class="mat-input-wrapper mat-form-field-wrapper" *ngIf="type==SearchType.range">-->
    <!--<div class="mat-input-flex mat-form-field-flex">-->
    <!--<div class="mat-input-infix mat-form-field-infix">-->
    <!--<input class="mat-input-element"-->
    <!--[placeholder]="label"-->
    <!--(change)="change()"-->
    <!--[(ngModel)]="value" #range-->
    <!--&gt;-->
    <!--<span-->
    <!--class="mat-input-placeholder-wrapper mat-form-field-placeholder-wrapper mat-form-field-can-float mat-form-field-should-float">-->
    <!--<label class="mat-input-placeholder mat-form-field-placeholder"-->
    <!--style="display: block;"-->
    <!--&gt;{{label}}</label>-->
    <!--</span>-->
    <!--</div>-->
    <!--<div class="mat-input-underline mat-form-field-underline" style="left: 0">-->
    <!--<span class="mat-input-ripple mat-form-field-ripple"></span>-->
    <!--</div>-->
    <!--</div>-->
  `,
  styleUrls: ['../../dform/component/lib-input/lib-input.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') hostClass = 'mat-form-field mat-form-field';
  @Input() type: SearchType;
  @Input() label: string;
  @Input() value: any;
  @Input() maxDate: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('date') date: any;
  @ViewChild('range') range: any;
  datepicker: any;
  SearchType = SearchType;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    flatpickr.l10ns.default.firstDayOfWeek = 1;
    if (this.type == this.SearchType.date) {
      this.datepicker = flatpickr(this.date.nativeElement, {
        'locale': Mandarin,
        'defaultDate': this.value || ''
      });
    }
    if (this.type == this.SearchType.range) {
      this.datepicker = flatpickr(this.range.nativeElement, {
        'locale': Mandarin,
        'mode': 'range',
        'defaultDate': this.value || '',
        'maxDate': this.maxDate || ''
      });
    }
  }

  ngOnDestroy() {
    this.datepicker = null;
  }

  change() {
    if (this.type == this.SearchType.date) {
      this.valueChange.emit(this.date.nativeElement.value);
    }
    if (this.type == this.SearchType.range) {
      this.valueChange.emit(this.range.nativeElement.value);
    }
  }
}
