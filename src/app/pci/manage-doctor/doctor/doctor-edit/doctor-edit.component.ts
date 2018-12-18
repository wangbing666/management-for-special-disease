import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { DoctorService } from '../_service/doctor.service';
import { DoctorFormService } from '../_service/doctor-form.service';
import { Doctor } from '../_entity/doctor.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html'
})
export class DoctorEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['doctor', 'data']) doctor: Observable<Doctor>;
  errMsg = '';
  form: any;
  state: boolean;

  constructor(
    private doctorService: DoctorService,
    private doctorFormService: DoctorFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.doctorService.getOptions().subscribe(res => {
      if (res.code === 0 && res.data) {
        this.doctor.subscribe(data => {
          console.log(data);
          if (data.id === 0) {
            this.state = null;
            this.containerConfig = this.doctorService.doctorEditConfig(true);
            this.form = this.doctorFormService.setForm(
              res.data.hospitalList,
              res.data.departmentList,
              res.data.doctorTitleList
            );
          } else {
            this.state = (data.statusIndex == 2);
            this.containerConfig = this.doctorService.doctorEditConfig(false);
            this.form = this.doctorFormService.setForm(
              res.data.hospitalList,
              res.data.departmentList,
              res.data.doctorTitleList,
              data
            );
          }
        });
      } else {
        this.errMsg = res.msg || ERRMSG.nullMsg;
      }
    }, err => {
      console.log(err);
      this.errMsg = ERRMSG.netErrMsg;
    });
  }

  getValues(value) {
    // console.log(value);
    if (this.state === true) {
      this.doctorService.doctorAuditedUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/doctor']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else if (this.state === false) {
      this.doctorService.doctorAuditingUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/doctor']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else if (this.state === null) {
      this.doctorService.doctorCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/doctor']);
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
