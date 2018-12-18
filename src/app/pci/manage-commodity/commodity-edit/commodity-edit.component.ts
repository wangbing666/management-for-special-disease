import { Component, OnInit } from '@angular/core';
import { CommodityService } from '../_service/commodity.service';
import { CommodityFormService } from '../_service/commodity-form.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Commodity } from '../_entity/commodity.entity';
import { ERRMSG } from '../../_store/static';
import { HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-commodity-edit',
  templateUrl: './commodity-edit.component.html'
})
export class CommodityEditComponent implements OnInit {

  containerConfig: ContainerConfig;
  @select(['commodity', 'data']) commodity: Observable<Commodity>;
  errMsg = '';
  form: any;
  commodityId: number;

  constructor(
    private commodityService: CommodityService,
    private commodityFormService: CommodityFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.commodity.subscribe(data => {
        this.commodityId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.commodityService.commodityEditConfig(true);
          this.form = this.commodityFormService.setForm();
        } else {
          this.containerConfig = this.commodityService.commodityEditConfig(false);
          this.form = this.commodityFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.commodityId !== 0) {
      this.commodityService.commodityUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/commodity']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.commodityService.commodityCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/commodity']);
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
