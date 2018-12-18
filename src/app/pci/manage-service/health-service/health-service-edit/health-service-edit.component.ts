import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { HealthServiceService } from '../_service/health-service.service';
import { HealthServiceFormService } from '../_service/health-service-form.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-health-service-edit',
  templateUrl: './health-service-edit.component.html',
})
export class HealthServiceEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  errMsg = '';
  form: any;
  healthServiceId: number;
  healthservice: any;

  constructor(
    private healthServiceService: HealthServiceService,
    private healthServiceFormService: HealthServiceFormService,
    private dialog: MatDialog,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      this.healthServiceId = params.id;
    });
    this.healthServiceService.getOrganization().subscribe(res => {
        if (res.code === 0 && res.data) {
          this.healthServiceService.getHealthService(this.healthServiceId).subscribe(data => {
            this.healthservice = data.data;
            this.healthservice.pictures = [];
            if (this.healthservice.healthBanner) {
              for (let i = 0; i < this.healthservice.healthBanner.length; i++) {
                this.healthservice.pictures.push(this.healthservice.healthBanner[i].imageUrl);
              }
            }
            if (data.serviceId === 0) {
              this.containerConfig = this.healthServiceService.healthServiceEditConfig(true);
              this.form = this.healthServiceFormService.setForm(res.data);
            } else {
              this.containerConfig = this.healthServiceService.healthServiceEditConfig(false);
              this.form = this.healthServiceFormService.setForm(res.data, this.healthservice);
            }
          });
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    value.healthBanners = [];
    if (value.pictures) {
      for (let i = 0; i < value.pictures.length; i++) {
        value.healthBanners[i] = {};
        value.healthBanners[i].imageUrl = value.pictures[i];
      }
      delete value.pictures;
    }
    if (this.healthServiceId > 0) {
      this.healthServiceService.healthServiceUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-service']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.healthServiceService.healthServiceCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-service']);
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
