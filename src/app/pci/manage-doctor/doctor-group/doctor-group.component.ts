import { Component, Inject, OnInit } from '@angular/core';
import { DoctorGroupService } from './_service/doctor-group.service';
import { DoctorGroupTableService } from './_service/doctor-group-table.service';
import { AuditingServiceTableService } from './_service/auditing-service-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';
import { DoctorGroup } from './_entity/doctor-group.entity';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-doctor-group',
  templateUrl: './doctor-group.component.html',
  styles: [`
    .content {
      position: relative;
    }

    .count {
      position: absolute;
      top: 10px;
      left: 315px;
    }

    @media (max-width: 600px) {
      .count {
        left: 280px;
      }
    }
  `]
})
export class DoctorGroupComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorGroupTable: TableOption;
  auditingServiceTable: TableOption;
  @select(['doctorGroup', 'tab']) tab: Observable<number>;
  @select(['doctorGroup', 'page']) page: Observable<Array<number>>;
  count: number;

  constructor(
    @Inject('action') private action,
    @Inject('nav') private navService,
    private doctorGroupService: DoctorGroupService,
    private doctorGroupTableService: DoctorGroupTableService,
    private auditingServiceTableService: AuditingServiceTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorGroupService.doctorGroupConfig();
    this.doctorGroupTable = new TableOption({
      titles: this.doctorGroupTableService.setTitles(),
      ifPage: true
    });
    this.auditingServiceTable = new TableOption({
      titles: this.auditingServiceTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.page.subscribe((page: Array<number>) => {
      this.getDoctorGroups(page[0]);
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getAuditingServices(page[1]);
    });
  }

  getDoctorGroups(page: number) {
    this.action.pageChange('doctorGroup', [page, this.auditingServiceTable.currentPage]);
    this.doctorGroupTable.reset(page);
    this.doctorGroupService.getDoctorGroups(page, this.doctorGroupTable.size)
      .subscribe(
        res => {
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.doctorGroupTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.doctorGroupTable.totalPage = res.data.totalPages;
            this.doctorGroupTable.lists = res.data.content;
          } else {
            this.doctorGroupTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorGroupTable.loading = false;
          console.log(err);
          this.doctorGroupTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getAuditingServices(page: number) {
    this.action.pageChange('doctorGroup', [this.doctorGroupTable.currentPage, page]);
    this.auditingServiceTable.reset(page);
    this.doctorGroupService.getAuditingServices(page, this.auditingServiceTable.size)
      .subscribe(
        res => {
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.auditingServiceTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.count = res.data.totalElements;
            this.navService.setCount(this.count, 'doctorgroup', 'doctorgroup');
            this.auditingServiceTable.totalPage = res.data.totalPages;
            this.auditingServiceTable.lists = res.data.content;
          } else {
            this.auditingServiceTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.auditingServiceTable.loading = false;
          console.log(err);
          this.auditingServiceTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  gotoHandle(res) {
    console.log(res);
    const doctorGroup = <DoctorGroup>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('doctorGroup', doctorGroup);
      this.router.navigate(['/doctor-group/edit']);
    }
    if (res.key === 'show') {
      this.router.navigate(['/doctor-group/service'], {queryParams: {id: doctorGroup.id}});
    }
    if (res.key === 'serviceList') {
      this.router.navigate(['/doctor-group/service-list'], {queryParams: {id: doctorGroup.id}});
    }
    if (res.key === 'auditing') {
      HintDialog('确定审核通过？', this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.process(doctorGroup.id);
        }
      });
    }
  }

  process(id) {
    this.doctorGroupService.serviceAuditingSuccess(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '操作成功！', this.dialog);
          this.reset1();
        } else {
          HintDialog(res.msg || '操作失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  change(index) {
    this.action.tabChange('doctor', index);
  }
}
