import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { PackageServiceService } from '../_service/package-service.service';
import { PackageServiceFormService } from '../_service/package-service-form.service';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PackageService } from '../_entity/package-service.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-package-service-edit',
  templateUrl: './package-service-edit.component.html',
})
export class PackageServiceEditComponent implements OnInit {

  containerConfig: ContainerConfig;
  @select(['packageService', 'data']) packageService: Observable<PackageService>;
  errMsg = '';
  form: any;
  packageServiceId: number;

  constructor(
    private packageServiceService: PackageServiceService,
    private packageServiceFormService: PackageServiceFormService,
    private dialog: MatDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.packageServiceService.getServiceOptionD().subscribe(data => {
        this.packageServiceService.getServiceOptionT().subscribe(obj => {
            this.packageService.subscribe(res => {
              this.packageServiceId = res.id;
              if (res.id === 0) {
                this.containerConfig = this.packageServiceService.packageServiceEditConfig(true);
                this.form = this.packageServiceFormService.setForm(data.data, obj.data);
              } else {
                this.containerConfig = this.packageServiceService.packageServiceEditConfig(false);
                this.form = this.packageServiceFormService.setForm(data.data, obj.data, res);
              }
            });
          }
        );
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    this.packageServiceService.packageServiceSave(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/package-service']);
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
