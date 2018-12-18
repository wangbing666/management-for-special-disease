import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Medicine } from '../../_entity/data-collection.entity';
import { DataCollectionService } from '../../_service/data-collection.service';

@Component({
  selector: 'app-medicine-form',
  templateUrl: 'medicine-form.component.html'
})
export class MedicineFormComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() index: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  searchStream: Subject<string> = new Subject<string>();
  results$: Array<any>;
  info: Medicine;

  enableOpt = [{
    name: '开启',
    value: true
  }, {
    name: '关闭',
    value: false
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    private _drugService: DataCollectionService
  ) {
  }

  ngOnInit() {
    this.info = this.data;
    if (this.info.id) {
      this.index = `${this.index}a${this.info.id}`;
    }
    if (this.info.startTime) {
      this.info.startTime = new Date(this.info.startTime);
    }
    this.searchStream
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(this.info.name);
      });
  }

  ngOnDestroy() {
    this.searchStream.unsubscribe();
  }

  saveAsDraft(data?) {
    if (data) {
      this.info[data] = moment(this.info[data]).format('YYYY-MM-DD');
    }
    this.dataChange.emit();
  }

  search($event) {
    this.searchStream.next(this.info.name);
  }

  loadData(key) {
    if (key) {
      this._drugService.getDrugs(key)
        .subscribe(res => {
          if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
            this.results$ = res.data.content;
          }
        });
    }
  }

  selected(data) {
    this.info.name = data.name;
    this.info.method = data.method;
    this.info.take = data.take;
    this.info.unit = data.dosageForm;
    this.info.dose = data.doseSpecification;
    this.results$ = [];
  }
}
