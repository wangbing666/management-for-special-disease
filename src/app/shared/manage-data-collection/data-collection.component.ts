import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { FormText } from '../../libs/dform/_entity/form-text';
import { EditDialog } from '../../libs/dmodal/dialog-edit.component';
import { HintDialog } from '../../libs/dmodal/dialog.component';
import { DialogEdit } from '../../libs/dmodal/dialog.entity';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { DataCollectionService } from './_service/data-collection.service';
import { DataCollectionTableService } from './_service/data-collection-table.service';
import { ERRMSG } from '../../pci/_store/static';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { _switch } from 'rxjs/operator/switch';

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html'
})
export class DataCollectionComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['dataCollection', 'tab']) tab: Observable < number > ;
  @select(['dataCollection', 'page']) page: Observable < Array < number >> ;

  waitingTable: TableOption;
  auditingTable: TableOption;
  auditedTable: TableOption;
  unhandledTable: TableOption;
  defeatedTable: TableOption;
  pages: any;

  entering: string;
  queryHospital: string;
  queryTime: string;
  hospitalList = [];
  MedicalHospitalsList = [];

  queryMedicalHospital: string;

  auth: boolean;

  constructor(
    @Inject('action') private action,
    private dataCollectionService: DataCollectionService,
    private dataCollectionTableService: DataCollectionTableService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.containerConfig = this.dataCollectionService.dataCollectionConfig();
    this.waitingTable = new TableOption({
      titles: this.dataCollectionTableService.setWaitingTitles(),
      ifPage: true
    });
    this.auditingTable = new TableOption({
      titles: this.dataCollectionTableService.setAuditingTitles(),
      ifPage: true
    });
    this.auditedTable = new TableOption({
      titles: this.dataCollectionTableService.setAuditedTitles(),
      ifPage: true
    });
    this.unhandledTable = new TableOption({
      titles: this.dataCollectionTableService.setUnhandledTitles(),
      ifPage: true
    });
    this.defeatedTable = new TableOption({
      titles: this.dataCollectionTableService.setDefeatedTitles(),
      ifPage: true
    })
    this.reset();
    this.getHospitals();
    this.getMedicalHospitals();
    this.getAuthName();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
    this.reset4();
  }

  reset0() {
    this.queryHospital = '';
    this.queryTime = '';
    this.waitingTable.queryKey = '';
    this.page.subscribe((page: Array < number > ) => {
      this.pages = page;
      this.getDataCollections(this.waitingTable, 0, page[0]);
    });
  }

  reset1() {
    this.auditingTable.queryKey = '';
    this.page.subscribe((page: Array < number > ) => {
      this.pages = page;
      this.getDataCollections(this.auditingTable, 1, page[1]);
    });
  }

  reset2() {
    this.auditedTable.queryKey = '';
    this.queryMedicalHospital = '';
    this.queryTime = '';
    this.page.subscribe((page: Array < number > ) => {
      this.pages = page;
      this.getDataCollections(this.auditedTable, 3, page[2]);
    });
  }

  reset3() {
    this.unhandledTable.queryKey = '';
    this.page.subscribe((page: Array < number > ) => {
      this.pages = page;
      this.getDataCollections(this.unhandledTable, 2, page[2]);
    });
  }

  reset4() {
    this.unhandledTable.queryKey = '';
    this.page.subscribe((page: Array < number > ) => {
      this.pages = page;
      this.getDataCollections(this.defeatedTable, 4, page[2]);
    });
  }

  getDataCollections(list: TableOption, type, page) {
    this.pages[type] = page;
    this.action.pageChange('dataCollection', this.pages);
    list.reset(page);
    this.dataCollectionService.getDataCollections(page, list.size, type, list.queryKey, this.queryHospital, this.queryTime, this.queryMedicalHospital, this.entering)
      .subscribe(
        res => {
          list.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length == 0) {
            list.errorMessage = ERRMSG.nullMsg
          } else if (res.code === 0 && res.data && res.data.content) {
            list.lists = res.data.content;
            list.lists.forEach(obj => {
              this.format(obj);
            })
            this.formatList(list.lists);
            // console.log(list.lists);
            list.totalPage = res.data.totalPages;
          } else {
            list.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          list.loading = false;
          console.log(err);
          list.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getHospitals() {
    this.dataCollectionService.getHospitals()
      .subscribe(res => {
        if (res.code == 0 && res.data) {
          this.hospitalList = res.data;
        }
      })
  }

  getMedicalHospitals() {
    this.dataCollectionService.getMedicalHospitals()
      .subscribe(res => {
        if (res.code == 0 && res.data) {
          this.MedicalHospitalsList = res.data;
        }
      })
  }

  /**
   * 判断是否兼职人员录入病史资料
   * @param auth 为 caozuoyuan 代表兼职人员
   */
  getAuthName() {
    const admin = window.sessionStorage.getItem('pci_login_token');
    const name = JSON.parse(admin).name.substring(0, 10);
    if (name == 'caozuoyuan') {
      this.auth = false;
    } else {
      this.auth = true;
    }
  }

  gotoHandle(data) {
    if (data.key === 'dataTypein') {
      this.router.navigate(['/data-collection/edit', data.value.id]);
    }
    if (data.key === 'editData') {
      this.router.navigate(['/data-collection/edit', data.value.id]);
    }
    if (data.key === 'showData') {
      this.router.navigate(['/data-collection/detail', data.value.id]);
    }
    if (data.key === 'keepData') {
      auditData(
        data.value.id, '您确定暂不处理该用户资料？', 2,
        this.dialog, this.dataCollectionService, () => {
          // console.log('success');
          this.reset();
        });
    }
    if (data.key === 'tapeOut') {
      auditData(data.value.id, '您确定要将资料提交到审核中？', 1,
        this.dialog, this.dataCollectionService, () => {
          // console.log('success');
          this.reset();
        });
    }
  }

  format(data) {
    if (data.inputList) {
      let inputName = ' ';
      data.inputList.forEach(obj => {
        inputName += ` ${obj.name}`;
      });
      data.inputName = inputName;
    }
    if (data.auditorList) {
      let auditorName = ' ';
      data.auditorList.forEach(obj => {
        auditorName += ` ${obj.name}`;
      });
      data.auditorName = auditorName;
    }
  }

  formatList(list) {
    if (typeof list === 'object') {
      list.forEach(obj => {
        obj.deleted = obj.deleted ? '已删除' : '否';
      });
    }
  }

  change(index) {
    this.action.tabChange('dataCollection', index);
  }
}

export function auditData(id, title, status, dialog, service, callback) {
  let form;
  switch (status) {
    case 1 || 3 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        })
      ];
      break;
    case 2 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        }),
        new FormText({
          key: 'remark',
          label: '备注',
          value: '',
          required: true
        })
      ];
      break;
    case 3 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        })
      ];
      break;
    case 4 :
      form = [
        new FormText({
          key: 'auditName',
          label: '提交人姓名',
          value: '',
          required: true
        }),
        new FormText({
          key: 'failedReason',
          label: '拒绝理由',
          value: '',
          required: true
        })
      ]
  }
  const config: DialogEdit = new DialogEdit({
    title: title,
    button: '提交',
    form: form
  });
  EditDialog(config, dialog).afterClosed().subscribe(result => {
    if (result && result.auditName) {
      result.status = status;
      service.statusChanged(id, result)
        .subscribe(res => {
          if (res.code == 0) {
            let subscribeDialog = HintDialog('提交成功', dialog).afterClosed().subscribe(() => {
              callback();
              subscribeDialog.unsubscribe();
            });
          } else {
            HintDialog(res.msg || '提交失败', dialog);
          }
        }, err => {
          HintDialog('请求服务器出错', dialog);
          throw new Error(err);
        })
    }
  });
}
