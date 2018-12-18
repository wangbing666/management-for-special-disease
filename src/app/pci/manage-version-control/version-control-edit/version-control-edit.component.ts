import { Component, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { VersionControlFormService } from '../_service/version-control-form.service';
import { VersionControlService } from '../_service/version-control.service';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';
import { VersionControl } from '../_entity/version-control.entity';

@Component({
  selector: 'app-version-control-edit',
  templateUrl: './version-control-edit.component.html'
})
export class VersionControlEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['versionControl', 'data']) versionControl: Observable<VersionControl>;
  errMsg = '';
  form: any;
  versionControlId: number;

  constructor(
    private versionControlService: VersionControlService,
    private versionControlFormService: VersionControlFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.versionControl.subscribe(data => {
        this.versionControlId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.versionControlService.versionControlEditConfig(true);
          this.form = this.versionControlFormService.setForm();
        } else {
          this.containerConfig = this.versionControlService.versionControlEditConfig(false);
          this.form = this.versionControlFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.versionControlId !== 0) {
      this.versionControlService.versionControlUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/version-control']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.versionControlService.versionControlCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/version-control']);
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
