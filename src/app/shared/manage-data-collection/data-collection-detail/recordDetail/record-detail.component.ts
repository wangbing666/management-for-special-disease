import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service/data-collection-detail.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: 'record-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class RecordDetailComponent implements OnInit {
  @Input() info: any;

  recordList: any;

  constructor(private dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    console.log(this.info);
    this.recordList = this.dataCollectionDetailService.setRecordList();
  }
}
