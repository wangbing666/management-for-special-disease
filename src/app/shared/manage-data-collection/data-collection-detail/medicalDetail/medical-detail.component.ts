import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service/data-collection-detail.service';

@Component({
  selector: 'app-medical-detail',
  templateUrl: 'medical-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class MedicalDetailComponent implements OnInit {
  @Input() info: any;

  medicalList: any;

  constructor(private dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.medicalList = this.dataCollectionDetailService.setMedicalList();
  }
}
