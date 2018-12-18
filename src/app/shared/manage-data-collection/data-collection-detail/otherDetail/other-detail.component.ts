import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service/data-collection-detail.service';

@Component({
  selector: 'app-other-detail',
  templateUrl: 'other-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class OtherDetailComponent implements OnInit {
  @Input() info: any;

  otherList: any;

  constructor(private dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.otherList = this.dataCollectionDetailService.setOtherList();
  }
}
