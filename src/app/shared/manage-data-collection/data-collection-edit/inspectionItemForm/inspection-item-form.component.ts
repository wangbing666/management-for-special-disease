import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Inspection } from '../../_entity/data-collection.entity';

@Component({
  selector: 'app-inspection-item-form',
  templateUrl: 'inspection-item-form.component.html'
})
export class InspectionItemFormComponent implements OnInit {
  @Input() data: any;
  @Input() examinationItemCheckDate: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: Inspection = new Inspection();

  standardOpt = [{
    name: '偏低',
    value: '0'
  }, {
    name: '正常',
    value: '1'
  }, {
    name: '偏高',
    value: '2'
  }];

  constructor() {
  }

  ngOnInit() {
    this.info = this.data;
    if (!this.info.standard) {
      this.info.standard = '1'
    }
  }

  saveAsDraft() {
    if (this.info && this.info.type == '1' && this.info.value) {
      if (parseFloat(this.info.value) > parseFloat(this.info.max)) {
        this.info.standard = '2';
      } else {
        this.info.standard = parseFloat(this.info.value) < parseFloat(this.info.min) ? '0' : '1';
      }
      this.info.examinationItemCheckDate = this.examinationItemCheckDate;
    }
    this.dataChange.emit();
  }
}
