import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { DoctorSortService } from '../_service/doctor-sort.service';
import { DoctorSortFormService } from '../_service/doctor-sort-form.service';
import { DoctorSort } from '../_entity/doctor-sort.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-sort-edit',
  templateUrl: './doctor-sort-edit.component.html'
})
export class DoctorSortEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['doctorSort', 'data']) doctorSort: Observable<DoctorSort>;
  errMsg = '';
  form: any;
  state: boolean;

  constructor(
    private doctorSortService: DoctorSortService,
    private doctorSortFormService: DoctorSortFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.doctorSort.subscribe(data => {
      if (data && data.id !== 0) {
        this.containerConfig = this.doctorSortService.doctorSortEditConfig();
        this.form = this.doctorSortFormService.setForm(data);
      } else {
        this.router.navigate(['/doctor-sort']);
      }
    });
  }

  // 提交保存信息
  getValues(data) {
    if (data.id !== 0) {
      this.doctorSortService.doctorRankEdit(data)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/doctor-sort']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }
  }
}
