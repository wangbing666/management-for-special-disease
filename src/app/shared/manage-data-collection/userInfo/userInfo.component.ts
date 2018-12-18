import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { DataCollectionService } from '../_service/data-collection.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['../data-collection.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  @Input() user;
  @Input() type;
  @Output() onChangehospital: EventEmitter<any> = new EventEmitter();

  hospitalName: string;

  results$: Array<any>;

  searchStream: Subject<string> = new Subject<string>();

  constructor(
    private _dataCollectionService: DataCollectionService
  ) {
  }

  ngOnInit() {
    this.searchStream
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(this.user.hospitalName);
      });
  }

  search($event) {
    this.searchStream.next(this.user.hospitalName);
  }

  ngOnDestroy() {
    this.searchStream.unsubscribe();
  }

  loadData(key) {
    if (key) {
      this._dataCollectionService.getHospitalAll(key)
        .subscribe(res => {
          if (res.code === 0 && res.data && res.data.length !== 0) {
            this.results$ = res.data;
          }
        });
    }
  }

  selected(data) {
    this.user.hospitalName = data.name;
    this.results$ = [];
    this.onChangehospital.emit(data.name);
  }
}
