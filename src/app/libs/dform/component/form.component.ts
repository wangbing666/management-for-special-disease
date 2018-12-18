import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from '../_entity/form-base';
import { DFormControlService } from '../_service/form-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() button: string;
  @Input() reset: boolean;
  @Input() optionButton: string;
  @Input() formDatas: FormBase<any>[] = [];
  @Output() formValues = new EventEmitter();
  @Output() optionChange = new EventEmitter();

  form: FormGroup;

  constructor(
    private fcs: DFormControlService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.formDatas);
    this.cdr.detectChanges();
  }

  ngOnChanges() {
    this.form = this.fcs.toFormGroup(this.formDatas);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    console.log('form destroy');
  }

  onSubmit() {
    this.formValues.emit(this.form.value);
  }

  optionClick() {
    this.optionChange.emit(this.form.value);
  }
}
