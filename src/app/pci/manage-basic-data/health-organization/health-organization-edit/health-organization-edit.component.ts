import { Component, OnInit } from '@angular/core';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { HealthOrganizationService } from '../_service/health-organization.service';
import { HealthOrganizationFormService } from '../_service/health-organization-form.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { HealthOrganization } from '../_entity/health-organization.entity';

@Component({
  selector: 'app-health-organization-edit',
  templateUrl: './health-organization-edit.component.html'
})
export class HealthOrganizationEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['healthOrganization', 'data']) healthOrganization: Observable<HealthOrganization>;
  errMsg = '';
  form: any;
  healthOrganizationId: number;

  constructor(
    private healthOrganizationService: HealthOrganizationService,
    private healthOrganizationFormService: HealthOrganizationFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.healthOrganization.subscribe(data => {
        this.healthOrganizationId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.healthOrganizationService.healthOrganizationEditConfig(true);
          this.form = this.healthOrganizationFormService.setForm();
        } else {
          this.containerConfig = this.healthOrganizationService.healthOrganizationEditConfig(false);
          this.form = this.healthOrganizationFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.healthOrganizationId !== 0) {
      this.healthOrganizationService.healthOrganizationEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-organization']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.healthOrganizationService.healthOrganizationCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-organization']);
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
