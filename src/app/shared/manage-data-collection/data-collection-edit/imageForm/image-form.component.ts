import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Image } from '../../_entity/data-collection.entity';

@Component({
  selector: 'app-image-form',
  templateUrl: 'image-form.component.html'
})
export class ImageFormComponent implements OnInit {
  @Input() data: any;
  @Input() index: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: Image;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.info = this.data;
    if (this.info.id) {
      this.index = `${this.index}a${this.info.id}`;
    }
  }

  saveAsDraft(data?) {
    if (data) {
      this.info[data] = moment(this.info[data]).format('YYYY-MM-DD');
    }
    this.dataChange.emit();
  }
}
