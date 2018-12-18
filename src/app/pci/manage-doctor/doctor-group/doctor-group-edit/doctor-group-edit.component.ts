import { Component, OnInit } from '@angular/core';
import { DoctorGroupService } from '../_service/doctor-group.service';
import { DoctorGroupFormService } from '../_service/doctor-group-form.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { DoctorGroup } from '../_entity/doctor-group.entity';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-doctor-group-edit',
  templateUrl: './doctor-group-edit.component.html'
})
export class DoctorGroupEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['doctorGroup', 'data']) doctorGroup: Observable<DoctorGroup>;
  errMsg = '';
  form;

  constructor(
    private doctorGroupFormService: DoctorGroupFormService,
    private doctorGroupService: DoctorGroupService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.doctorGroup.subscribe(data => {
      this.containerConfig = this.doctorGroupService.doctorGroupEditConfig();
      this.form = this.doctorGroupFormService.setForm(data);
    }, err => {
      console.log(err);
      this.errMsg = ERRMSG.otherMsg;
    });
  }

  getValues(data) {
    console.log(data);
    this.doctorGroupService.doctorGroupUpdateDesc(data.id, data.description)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/doctor-group']);
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
