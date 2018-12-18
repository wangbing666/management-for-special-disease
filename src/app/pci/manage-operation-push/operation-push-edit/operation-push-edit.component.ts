import { ChangeDetectorRef, Component, OnInit, Inject, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormDatetime } from '../../../libs/dform/_entity/form-datetime';
import { FormRadio } from '../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { OperationPushService } from '../_service/operation-push-service.service';
import { OperationPush } from '../_entity/operationPush.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-operation-push-edit',
  templateUrl: './operation-push-edit.component.html',
  styleUrls: ['./operation-push-edit.component.css']
})
export class OperationPushEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['operationPush', 'data']) operationPush: Observable<OperationPush>;
  form: FormGroup;
  config: any;
  id: any;
  operator: any;
  send: any;
  http = false;
  skip = false;
  date = false;
  errMsg = '';

  constructor(
    @Inject('auth') private authService,
    private dialog: MatDialog,
    private operationpushservice: OperationPushService,
    private fb: FormBuilder,
    private routers: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.operationPush.subscribe(data => {
      if (data.id !== 0) {
        this.containerConfig = this.operationpushservice.operationPushEditConfig(false);
        this.getpushUrl(data);
        this.createForm(data);
        this.date = true;
        this.id = data.id;
        this.operator = data.operator;
      } else {
        console.log(data);
        this.containerConfig = this.operationpushservice.operationPushEditConfig(true);
        this.createForm(data);
        this.http = true;
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      typeIdx: new FormControl({value: ''}, Validators.required),
      content: new FormControl({value: ''}, Validators.required),
      type: new FormControl({value: ''}, Validators.required),
      send: new FormControl({value: ''}, Validators.required),
      pushUrl: new FormControl({value: ''}),
      skip: new FormControl({value: ''}),
      number: new FormControl({value: ''}),
      pushTime: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      typeIdx: new FormRadio({
        label: '发送APP',
        key: 'typeIdx',
        options: [{
          id: 0,
          name: '患者端',
        }, {
          id: 1,
          name: '医生端',
        }],
        value: data && data.type || 0
      }),
      content: new FormText({
        type: 'text',
        label: 'push内容',
        key: 'content',
        value: data && data.content || ''
      }),
      type: new FormRadio({
        label: 'push链接',
        key: 'skip',
        options: [{
          id: true,
          name: '跳转到网址',
        }, {
          id: false,
          name: '跳转到APP页面',
        }],
        value: data && data.skip || ''
      }),
      pushUrl: new FormText({
        type: 'text',
        label: '请输入网址',
        key: 'pushUrl',
        value: data && data.pushUrl || ''
      }),
      skip: new FormRadio({
        label: '跳转页面',
        key: 'type',
        options: [{
          id: 0,
          name: '医生详情页',
        }, {
          id: 1,
          name: '第三方服务页',
        }],
        value: data && data.type || 0
      }),
      number: new FormText({
        type: 'text',
        label: '请输入序号',
        key: 'number',
        value: data && data.number || ''
      }),
      send: new FormRadio({
        label: '发送时间',
        key: 'send',
        options: [{
          id: true,
          name: '保存即发送',
        }, {
          id: false,
          name: '设定发送时间',
        }],
        value: data && data.send
      }),
      pushTime: new FormDatetime({
        key: 'pushTime',
        label: '请选择发送时间',
        value: data && data.pushTime || ''
      })
    }
  }

  sendApp(id) {
    if (id === 1) {
      this.skip = false;
      this.config.type.options = [
        {
          id: true,
          name: '跳转到网址',
          checked: false
        }
      ];
    } else if (id === 0) {
      this.config.type.options = [
        {
          id: true,
          name: '跳转到网址',
          checked: false
        }, {
          id: false,
          name: '跳转到APP页面',
          checked: true
        }
      ];
    }
  }

  toPush(id) {
    if (id === true) {
      this.http = true;
      this.skip = false;
    } else if (id === false) {
      this.http = false;
      this.skip = true;
    }
  }

  sendTime(id) {
    if (id === false) {
      this.date = true;
    } else if (id === true) {
      this.date = false;
    }
  }

  // 编辑信息显示
  getpushUrl(data) {
    data.send = false;
    if (data.pushUrl) {
      var string = data.pushUrl.substring(13, 19);
    }
    if (string === 'doctor') {
      this.skip = true;
      data.skip = false;
      let number = data.match(/\d/g).join('');
      data.number = number;
      return data;
    } else if (string === 'thirdS') {
      this.skip = true;
      data.skip = false;
      let number = data.match(/\d/g).join('');
      data.number = number;
      return data;
    } else {
      data.skip = true;
      this.http = true;
    }
  }

// 状态信息转换
  getStatus(value) {
    if (value.send === false) {
      value.pushTime = this.getpushTime(value.pushTime);
    } else {
      delete value.pushTime;
    }
    if (value.skip === true) {
      delete value.number;
      delete value.skip;
      delete value.type;
      value.pushUrl = value.pushUrl;
    } else {
      delete value.number;
      delete value.skip;
      delete value.type;
      if (value.type === '0') {
        value.pushUrl = 'PCIPatient://doctor/' + Number(value.number);
      } else if (value.type === '1') {
        value.pushUrl = 'PCIPatient://thirdService/' + Number(value.number);
      }
    }
    return value;
  }

  getValues(value) {
    this.getStatus(value);
    if (this.id) {
      value.pushId = this.id;
      value.operator = this.operator;
      this.operationpushservice.OperationPushAdd(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.routers.navigate(['/operation-push']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        })
    } else {
      value.operator = this.authService.getAdminName();
      this.operationpushservice.OperationPushAdd(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.routers.navigate(['/operation-push']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        })
    }
  }

  // 提交时间转换
  getpushTime(date) {
    var time = new Date(date.replace(/-/g, '/'));
    return time.getTime();
  }

}


