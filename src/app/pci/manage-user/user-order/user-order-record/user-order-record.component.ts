import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { UserOrderService } from '../_service/user-order.service';
import { ServiceRecordFormService } from '../_service/service-record-form.service';
import { UserOrder } from '../_entity/user-order.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-user-order-record',
  templateUrl: './user-order-record.component.html'
})
export class UserOrderRecordComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['userOrder', 'data']) userOrder: Observable<UserOrder>;
  errMsg = '';
  form: any;
  serviceList: any;
  state: boolean;

  constructor(
    private userOrderService: UserOrderService,
    private serviceRecordFormService: ServiceRecordFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userOrder.subscribe(data => {
      this.userOrderService.getOrderRecordServiceList(Number(data.id)).subscribe(res => {
        if (res.code === 0 && res.data) {
          this.serviceList = res.data;
          this.containerConfig = this.userOrderService.userOrderEditConfig();
          this.form = this.serviceRecordFormService.setForm(
            res.data
          );
        } else {
          this.errMsg = res.msg || ERRMSG.nullMsg;
        }
      }, err => {
        this.errMsg = ERRMSG.netErrMsg;
      });
    })
  }

  getValues(data) {
    let name = '';
    this.serviceList.forEach(obj => {
      if (obj.id === Number(data.serviceId)) {
        name = obj.name;
      }
    });
    this.userOrderService.orderRecordCreate(data.serviceId, name)
      .subscribe(
        res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/user-order']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          HintDialog(ERRMSG.saveError, this.dialog);
        })

  }

  //
  // gotoHandle(data) {
  //   if (data.key === 'del') {
  //     this._userOrderService.orderRecordDel(data.value.id)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.getOrderRecord();
  //           }
  //         })
  //   }
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
