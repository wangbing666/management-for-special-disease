import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { Collection, InspectionFormList } from '../_entity/data-collection.entity';
import { DataCollectionDetailService } from '../_service/data-collection-detail.service';
import { DataCollectionService } from '../_service/data-collection.service';
import { auditData } from '../data-collection.component';

declare let localStorage: any;
declare let document: any;

@Component({
  selector: 'app-data-collection-edit',
  templateUrl: 'data-collection-edit.component.html',
  styleUrls: ['../data-collection.component.css']
})
export class DataCollectionEditComponent implements OnInit {
  containerConfig: ContainerConfig;

  id: number;
  userInfo: any;

  commonList: any;
  editFormList: Collection[] = [];
  errorMessage = '';
  hospitalName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private dialog: MatDialog,
    private dataCollectionService: DataCollectionService,
    private dataCollectionDetailService: DataCollectionDetailService
  ) {

  }

  ngOnInit() {
    this.containerConfig = this.dataCollectionService.dataCollectionEditConfig();
    this.getTitle();
    this.getDataCollection();
  }

  resetData() {
    this.userInfo = null;
    this.errorMessage = '';
  }

  getTitle() {
    this.commonList = this.dataCollectionDetailService.setCommonList();
  }

  setUpdateData(data, type) {
    let updateData = new Collection();
    if (type === 1 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];

      updateData.InspectionFormList = [];
      if (data.object && data.object.recordExaminationItemList) {
        data.object.recordExaminationItemList.forEach(obj => {
          updateData.InspectionFormList.push(new InspectionFormList(
            {
              itemId: obj.id,
              list: obj.examinationItemList || []
            }
          ));
        });
      }
    }

    if (type === 2 && data.id) {
      updateData.id = data.id || '';
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];

      updateData.InspectionFormList = [];
      if (data.object && data.object.recordExaminationItemList) {
        data.object.recordExaminationItemList.forEach(obj => {
          updateData.InspectionFormList.push(new InspectionFormList(
            {
              itemId: obj.id,
              list: obj.examinationItemList || []
            }
          ));
        });
      }
      updateData.recordPrescriptionMedicineList = data.object && data.object.recordPrescriptionMedicineList || [];
      updateData.recordImagingReportList = data.object && data.object.recordImagingReportList || [];

      updateData.hospitalNo = data.object && data.object.hospitalNo || '';
      updateData.pathobiologyNo = data.object && data.object.pathobiologyNo || '';
      updateData.xrayNo = data.object && data.object.xrayNo || '';
      updateData.bedNo = data.object && data.object.bedNo || '';
      updateData.sectionOffice = data.object && data.object.sectionOffice || '';
      updateData.inTime = data.object && data.object.inTime || '';
      updateData.outTime = data.object && data.object.outTime || '';
      updateData.cause = data.object && data.object.cause || '';
      updateData.diagnosis = data.object && data.object.diagnosis || '';
      updateData.briefHistoryName = data.object && data.object.briefHistoryName || '';
      updateData.briefHistoryChief = data.object && data.object.briefHistoryChief || '';
      updateData.briefHistoryPresent = data.object && data.object.briefHistoryPresent || '';
      updateData.briefHistoryPast = data.object && data.object.briefHistoryPast || '';
      updateData.physicalTemperature = data.object && data.object.physicalTemperature || '';
      updateData.physicalPulse = data.object && data.object.physicalPulse || '';
      updateData.physicalRespiration = data.object && data.object.physicalRespiration || '';
      updateData.physicalBloodPressureDiastolic = data.object && data.object.physicalBloodPressureDiastolic || '';
      updateData.physicalBloodPressureSystolic = data.object && data.object.physicalBloodPressureSystolic || '';
      updateData.physicalExamination = data.object && data.object.physicalExamination || '';
      updateData.treatmentCondition = data.object && data.object.treatmentCondition || '';
      updateData.treatmentResult = data.object && data.object.treatmentResult || '';
      updateData.leaveCondition = data.object && data.object.leaveCondition || '';
      updateData.leaveSuggestion = data.object && data.object.leaveSuggestion || '';
      updateData.physicianChief = data.object && data.object.physicianChief || '';
      updateData.physicianAttending = data.object && data.object.physicianAttending || '';
      updateData.physicianResident = data.object && data.object.physicianResident || '';
      updateData.physicianIntern = data.object && data.object.physicianIntern || '';
      updateData.writeTime = data.object && data.object.writeTime || '';
      updateData.deleted = data.object && data.object.deleted || '';
    }

    if (type === 3 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.reason = data.reason || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
    }

    if (type === 4 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.recordPrescriptionMedicineList = data.object && data.object.recordPrescriptionMedicineList || [];
    }

    if (type === 5 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.content = data.object && data.object.content || '';
    }

    if (type === 6 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.remark = data.remark || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.title = data.object && data.object.title || '';
    }
    return updateData;
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

  getDataCollection() {
    this.resetData();
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = +params['id'];
      this.editFormList = this.getLocalStorage(`inputData${+params['id']}`);
      this.dataCollectionService.getDataCollection(+params['id'])
        .subscribe(res => {
          if (res.code === 0 && res.data) {
            if (res.data.status == 3) {
              HintDialog('该用户资料已录入哦！', this.dialog);
            } else {
              this.userInfo = res.data;
            }
          } else {
            HintDialog(res && res.msg || '访问数据出错啦～', this.dialog);
          }
        }, err => {
          HintDialog('啊哦～访问接口出错啦～', this.dialog);
          throw new Error(err);
        })
    })
  }

  newForm() {
    this.editFormList.push(new Collection());
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  dataChange(data, i) {
    this.editFormList[i] = data;
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  onChangehospital(name) {
    this.hospitalName = name;
  }

  delForm(i) {
    this.editFormList.splice(i, 1);
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  setLocalStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  getLocalStorage(key) {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return [];
  }

  toedit(ele) {
    ele.hidden = false;
  }

  tocancel(ele) {
    ele.hidden = true;
  }

  todel(obj) {
    let data = this.setUpdateData(obj, obj.recordHistoryType);
    if (data.InspectionFormList) {
      data.recordExaminationItemList = [];
      data.InspectionFormList.forEach(sobj => {
        sobj.list.forEach(list => {
          list.itemId = sobj.itemId;
          if (sobj.deleted) {
            list.deleted = sobj.deleted;
          }
        });
        data.recordExaminationItemList.push(...sobj.list);
      });
      delete data.InspectionFormList;
    }
    data.deleted = true;
    this.dataCollectionService.dataCollectionCreate(this.userInfo.id, data)
      .subscribe(res => {
        if (res && res.code === 0) {
          HintDialog(res.msg || '删除数据成功！', this.dialog);
          this.getDataCollection();
        } else {
          HintDialog(res.msg || '删除数据失败！', this.dialog);
        }
      }, err => {
        HintDialog('链接服务器出错啦～请重新操作！', this.dialog);
        throw new Error(err);
      });
  }

  saveSuccess(flagInfo) {
    HintDialog('保存数据成功！', this.dialog);
    let i = this.editFormList.indexOf(flagInfo);
    if (i > -1) {
      this.delForm(i);
    }
    this.getDataCollection();
  }

  // 修改图片
  toUpdateImg() {
    this.router.navigate(['/data-collection/updateImg', this.id]);
  }

  toPass() {
    auditData(this.id, '您确定要将资料提交到审核中？', 1,
      this.dialog, this.dataCollectionService, () => {
        this.router.navigate(['/data-collection']);
      });
  }

  toAudit() {
    auditData(this.id, '您确定要将资料提交到审核中？', 1,
      this.dialog, this.dataCollectionService, () => {
        this.router.navigate(['/data-collection']);
      });
  }

  toOnline() {
    auditData(this.id, '您确定要通过审核？', 3,
      this.dialog, this.dataCollectionService, () => {
        this.router.navigate(['/data-collection']);
      });
  }

  toUnpass() {
    auditData(this.id, '您确定审核不通过？', 4,
      this.dialog, this.dataCollectionService, () => {
        this.router.navigate(['/data-collection']);
      });
  }
}
