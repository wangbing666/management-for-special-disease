/**
 * Created by zhanglin on 2017/7/26.
 */
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { IntegralOrderService } from '../_service/integral-order.service';
import { IntegralOrderFormService } from '../_service/integral-order-form.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IntegralOrder } from '../_entity/integralOrder.entity';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
})
export class SendMessageComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['integralOrder', 'data']) integralOrder: Observable<IntegralOrder>;
  form: any;
  config: any;
  expressList: Array<any>;
  expressId: number;
  expressName: string;
  editkey: boolean;
  goodsName: string;
  trackingNum: string;
  message: string;
  processStatus: number;
  integralOrderId: number;

  constructor(
    private integralOrderService: IntegralOrderService,
    private integralOrderFormService: IntegralOrderFormService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.integralOrderService.getExpressList().subscribe(express => {
      this.expressList = express.data;
      this.expressName = express.data[0];
      this.integralOrder.subscribe(data => {
        this.goodsName = data.title;
        this.processStatus = data.processStatus;
        this.integralOrderId = data.id;
        if (data.key === 'sendMessage') {
          this.editkey = true;
          this.containerConfig = this.integralOrderService.sendMessageConfig(true);
          this.createSendMessageForm(this.expressList);
          this.cdr.detectChanges();
        } else if (data.key === 'editNumber') {
          this.editkey = false;
          this.containerConfig = this.integralOrderService.sendMessageConfig(false);
          this.createEditMessageForm(this.expressList, data);
          this.cdr.detectChanges();
        }
      });
    });
  }

  createSendMessageForm(expressList) {
    this.form = this.fb.group({
      expressId: new FormControl({value: ''}, Validators.required),
      trackingNum: new FormControl({value: ''}, Validators.required),
      message: new FormControl({value: ''})
    });
    this.config = {
      expressId: new FormDropdown({
        label: '快递公司',
        key: 'expressId',
        value: '',
        options: expressList
      }),
      trackingNum: new FormText({
        label: '快递单号',
        key: 'trackingNum',
        value: '',
      }),
      message: new FormTextarea({
        label: '短信内容',
        key: 'message',
        value: '',
      })
    }
  }

  createEditMessageForm(expressList, data?: any) {
    this.form = this.fb.group({
      expressId: new FormControl({value: ''}, Validators.required),
      trackingNum: new FormControl({value: ''}, Validators.required)
    });
    this.config = {
      expressId: new FormDropdown({
        label: '快递公司',
        key: 'expressId',
        value: data && data.expressId || '',
        options: expressList
      }),
      trackingNum: new FormText({
        label: '快递单号',
        key: 'trackingNum',
        value: data && data.trackingNum || '',
      })
    }
  }

  expressChange() {
    const id = this.config.expressId.value;
    this.expressList.forEach(element => {
      if (element.id === id) {
        this.expressName = element.name;
      }
    });
  }

  setMsg() {
    this.trackingNum = this.config.trackingNum.value;
    this.message = '您兑换' + this.goodsName + '已发货，快递为' + this.expressName + '，单号为' + this.trackingNum + '，请注意查收，如有问题，请联系客服400-112-1881';
    this.config.message.value = this.message;
  }

  getValues(value) {
    let body: any;
    if (this.processStatus === 0) {
      body = {
        exchangeId: this.integralOrderId,
        courierId: value.expressId,
        trackingNum: value.trackingNum,
        msg: this.message,
        operator: this.auth.getAdminName()
      };
    } else {
      body = {
        exchangeId: this.integralOrderId,
        courierId: value.expressName,
        trackingNum: value.expressNumber,
        operator: this.auth.getAdminName()
      };
    }
    this.integralOrderService.editExpressNo(body).subscribe(res => {
      if (res.code === 0) {
        HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
          this.router.navigate(['/integral-order']);
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
