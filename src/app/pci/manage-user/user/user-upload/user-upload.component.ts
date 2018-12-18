import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDate } from '../../../../libs/dform/_entity/form-date';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { UserService } from '../_service/user.service';
import { UserFormService } from '../_service/user-form.service';
import { User } from '../_entity/user.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html'
})
export class UserUploadComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['user', 'data']) user: Observable<User>;
  errMsg = '';

  form: FormGroup;
  config: any;
  disabled: boolean;

  constructor(
    @Inject('app') private app,
    private userFormService: UserFormService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user.subscribe(data => {
      this.containerConfig = this.userService.userUploadConfig();
      // this.form = this.userFormService.setUploadForm(data);
      this.createForm(data);
    });
  }

  createForm(data?) {
    this.form = this.fb.group({
      userId: new FormControl(Validators.required),
      checkDate: new FormControl(Validators.required),
      imgUrlList: new FormControl(Validators.required),
    });
    this.config = {
      userId: new FormText({
        key: 'userId',
        label: '用户ID',
        value: data && data.id || '',
        readonly: true,
      }),
      checkDate: new FormDate({
        key: 'checkDate',
        label: '报告检查时间',
        value: '',
      }),
      imgUrlList: new FormFile({
        key: 'imgUrlList',
        label: '病历图片',
        value: '',
        multiple: true,
        url: `${this.app.pci.BASE_URL}api/upload/list`,
      }),
    }
  }

  getValues(value) {
      this.disabled = true;
      this.userService.userUpload(value)
        .subscribe(res => {
          if (res.code === 0) {
            this.disabled = false;
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/user']);
            });
          } else {
            this.disabled = false;
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          this.disabled = false;
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
  }
}
