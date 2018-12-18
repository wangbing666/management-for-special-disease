import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormType } from '../_entity/form-base';

@Component({
  selector: 'app-form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form.component.scss']
})
export class DynamicFormSetComponent implements OnInit {
  @Input() formdata: any;
  @Input() form: FormGroup;

  formControl = FormType;

  constructor() {
  }

  ngOnInit() {
  }
}
