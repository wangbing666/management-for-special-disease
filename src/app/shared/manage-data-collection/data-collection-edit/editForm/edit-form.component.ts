import {
  Component, OnInit,
  Input, Output, EventEmitter,
  ChangeDetectorRef, AfterViewChecked, AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { Collection, Image, InspectionFormList, Medicine } from '../../_entity/data-collection.entity';
import { DataCollectionService } from '../../_service/data-collection.service';
import * as moment from 'moment';

const typeList = ['检验报告', '出院小结', '影像资料', '用药清单', '就诊记录', '其他'];

@Component({
  selector: 'app-edit-form',
  templateUrl: 'edit-form.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class EditFormComponent implements OnInit, AfterViewInit {
  @Input() id;
  @Input() hospitalName;
  @Input() editFormData: Collection;
  @Input() images: any[];
  @Input() index;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmmiter: EventEmitter<any> = new EventEmitter();

  info: Collection = new Collection();
  imageList = [];
  typeList = typeList;

  recordPhotos: Array<number> = [];
  results$: Array<any>;

  inspectionFormList: InspectionFormList[] = [];
  medicineFormList: Medicine[] = [];
  imageFormList: Image[] = [];

  // enableShow = false;
  // message: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private _dataCollectionService: DataCollectionService
  ) {

  }

  ngOnInit() {
    this.info = this.editFormData;
    this.recordPhotos = (this.info.medicalRecordPhotoList &&
      this.info.medicalRecordPhotoList.length !== 0) ?
      this.info.medicalRecordPhotoList : [];

    this.images.forEach(obj => {
      let checkedValue = false;
      this.recordPhotos.forEach(ids => {
        if (obj.id == ids) {
          checkedValue = true;
        }
      });
      this.imageList.push({id: obj.id, imgUrl: obj.imgUrl, checked: checkedValue});
    });

    if (this.info.InspectionFormList && this.info.InspectionFormList.length !== 0) {
      this.inspectionFormList = this.info.InspectionFormList;
    }

    if (this.info.recordPrescriptionMedicineList && this.info.recordPrescriptionMedicineList.length !== 0) {
      this.info.recordPrescriptionMedicineList.forEach((obj) => {
        this.medicineFormList.push(obj);
      })
    }

    if (this.info.recordImagingReportList && this.info.recordImagingReportList.length !== 0) {
      this.info.recordImagingReportList.forEach((obj) => {
        this.imageFormList.push(obj);
      })
    }
  }

  ngAfterViewInit() {
  }

  getImageList(list: any[]) {
    let imgList = [];
    list.forEach(obj => {
      if (typeof obj == 'object') {
        imgList.push(Number(obj.id));
      } else {
        imgList.push(Number(obj))
      }
    });
    return imgList;
  }

  resetImages(images: Array<any>, recordList: Array<number>) {
    images.forEach(obj => {
      if (recordList.indexOf(Number(obj.id)) > -1) {
        obj.checked = true;
      }
    })
  }

  getChecked() {
    this.recordPhotos = [];
    this.imageList.forEach(image => {
      if (image.checked) {
        this.recordPhotos.push(image.id);
      }
    });
    console.log(this.recordPhotos);
    this.info.medicalRecordPhotoList = this.recordPhotos;
    this.saveAsDraft();
  }

  newInspectionForm() {
    this.inspectionFormList.push(new InspectionFormList());
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  delInspectionForm(i) {
    if (this.inspectionFormList[i].list[0].id) {
      this.inspectionFormList[i].deleted = true;
    } else {
      this.inspectionFormList.splice(i, 1);
    }
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  reInspectionForm(i) {
    this.inspectionFormList[i].deleted = false;
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  newImageForm() {
    this.imageFormList.push(new Image());
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  delImageForm(i) {
    if (this.imageFormList[i].id) {
      this.imageFormList[i].deleted = true;
    } else {
      this.imageFormList.splice(i, 1);
    }
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  reImageForm(i) {
    this.imageFormList[i].deleted = false;
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  newMedicineForm() {
    this.medicineFormList.push(new Medicine());
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  delMedicineForm(i) {
    if (this.medicineFormList[i].id) {
      this.medicineFormList[i].deleted = true;
    } else {
      this.medicineFormList.splice(i, 1);
    }
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  reMedicineForm(i) {
    this.medicineFormList[i].deleted = false;
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  saveAsDraft(data?) {
    if (!this.info.id) {
      if (data) {
        this.info[data] = moment(this.info[data]).format('YYYY-MM-DD');
        // console.log(this.info[data]);
      }
      // console.log('save' + JSON.stringify(this.info));
      // console.log('saveAsDraft');
      this.dataChange.emit(this.info);
    }
  }

  changeType() {
    let data = this.info;
    this.info = new Collection();
    this.info.recordHistoryType = data.recordHistoryType;
    this.info.checkDate = data.checkDate || '';
    this.info.hospitalName = this.hospitalName || '';
    this.info.officeName = data.officeName || '';
    this.info.medicalRecordPhotoList = data.medicalRecordPhotoList || [];
    this.saveAsDraft();
  }

  save() {
    if (this.info.InspectionFormList) {
      this.info.recordExaminationItemList = [];
      this.info.InspectionFormList.forEach(obj => {
        obj.list.forEach(list => {
          list.itemId = obj.itemId;
          if (obj.deleted) {
            list.deleted = obj.deleted;
          }
        });
        this.info.recordExaminationItemList.push(...obj.list);
      });
      delete this.info.InspectionFormList;
    }
    if (this.info.recordPrescriptionMedicineList) {
      this.info.recordPrescriptionMedicineList.forEach(obj => {
        obj.startTime = (new Date(obj.startTime)).valueOf();
      });
    }
    if (!this.info.medicalRecordPhotoList || this.info.medicalRecordPhotoList.length == 0) {
      HintDialog('请选择图片！', this.dialog);
    } else {
      this._dataCollectionService.dataCollectionCreate(this.id, this.info)
        .subscribe(res => {
          // console.log(res);
          if (res.code === 0) {
            this.saveSuccess.emit(this.info);
          } else {
            HintDialog(res.msg || '保存数据失败！', this.dialog);
          }
        }, err => {
          HintDialog('链接服务器出错啦～请重新保存！', this.dialog);
          throw new Error(err);
        });
    }
  }

  cancel() {
    this.cancelEmmiter.emit();
  }
}
