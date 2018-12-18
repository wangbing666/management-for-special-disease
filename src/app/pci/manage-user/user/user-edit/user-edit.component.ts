import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { UserService } from '../_service/user.service';
import { UserFormService } from '../_service/user-form.service';
import { User } from '../_entity/user.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['user', 'data']) user: Observable<User>;
  errMsg = '';
  form: any;
  state: boolean;

  constructor(
    private userFormService: UserFormService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getOptions().subscribe(res => {
      if (res.code === 0 && res.data) {
        this.user.subscribe(data => {
          this.state = data.state;
          if (data.userid === 0) {
            this.containerConfig = this.userService.userEditConfig(true);
            this.form = this.userFormService.setForm(
              res.data.hospitalList,
            );
          } else {
            console.log(data)
            this.containerConfig = this.userService.userEditConfig(false);
            this.form = this.userFormService.setForm(
              res.data.hospitalList,
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
    console.log(value);
    if (this.state === null) {
      this.userService.userCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/user']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.userService.userUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/user']);
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
