import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service/data-collection-detail.service';

@Component({
  selector: 'app-brief-detail',
  templateUrl: 'brief-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class BriefDetailComponent implements OnInit {
  @Input() info: any;

  basicList: any;
  brifeList: any;
  physicalList: any;
  extraList: any;
  doctorList: any;
  medicalList: any;
  imageList: any;
  inspectionList: any;

  constructor(private _dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    if (this.info.physicalBloodPressureSystolic && this.info.physicalBloodPressureDiastolic) {
      this.info.physicalBloodPressure = `${this.info.physicalBloodPressureSystolic}/${this.info.physicalBloodPressureDiastolic} mmHg`;
    }
    this.getTitle();
  }

  getTitle() {
    this.basicList = this._dataCollectionDetailService.setBasicList();
    this.brifeList = this._dataCollectionDetailService.setBriefList();
    this.physicalList = this._dataCollectionDetailService.setPhysicalList();
    this.extraList = this._dataCollectionDetailService.setExtraList();
    this.doctorList = this._dataCollectionDetailService.setDoctorList();
    this.medicalList = this._dataCollectionDetailService.setMedicalList();
    this.imageList = this._dataCollectionDetailService.setImageList();
    this.inspectionList = this._dataCollectionDetailService.setInspectionList();
  }
}
