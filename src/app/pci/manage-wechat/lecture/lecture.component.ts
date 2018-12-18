import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { ControlType, TableOption } from '../../../libs/dtable/dtable.entity';
import { LectureService } from './_service/lecture.service';
import { LectureTableService } from './_service/lecture-table.service';
import { Lecture } from './_entity/lecture.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {
  containerConfig: ContainerConfig;
  lectureTable: TableOption;

  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    @Inject('auth') private authService,
    private lectureService: LectureService,
    private lectureTableService: LectureTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('lecture', new Lecture());
  }

  ngOnInit() {
    this.containerConfig = this.lectureService.lectureConfig();
    this.lectureTable = new TableOption({
      titles: this.lectureTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getLectures();
  }

  getLectures() {
    this.lectureService.getLecture()
      .subscribe(
        res => {
          this.lectureTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.lectureTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.lectureTable.lists = res.data.content;
            for (let i = 0; i < this.lectureTable.lists.length; ++i) {
              this.lectureTable.lists[i].state = this.getStatus(this.lectureTable.lists[i].status);
              this.lectureTable.lists[i].edit = this.getEdit(this.lectureTable.lists[i].status);
            }
          } else {
            this.lectureTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.lectureTable.loading = false;
          this.lectureTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getStatus(status) {
    if (status === 0) {
      return '上线'
    } else if (status === 1) {
      return '下线'
    } else if (status === 2) {
      return ' '
    }
  }

  getEdit(value) {
    if (value === 2) {
      return ' ';
    } else {
      return '编辑'
    }
  }

  newData() {
    this.action.dataChange('lecture', new Lecture());
    this.router.navigate(['/lecture/edit']);
  }

  gotoHandle(res, list) {
    console.log(res);
    const lecture = <Lecture>list;
    if (res === 'signCodeUrl') {
      ImageDialog(lecture.name, lecture.signCodeUrl, this.dialog);
    }
    if (res === 'edit') {
      this.action.dataChange('lecture', lecture);
      this.router.navigate(['/lecture/edit']);
    }
    if (res === 'joinCount') {
      this.router.navigate(['/lecture/detail'], {queryParams: {id: lecture.id}});
    }
    if (res === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除讲座${lecture.name}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'topass') {
          const data = {
            id: '',
            admin: '',
            status: 3,
          };
          data.id = lecture.id;
          data.admin = this.authService.getAdminId();
          this.toDeleteLecture(data);
        }
      });
    }
    if (res === 'state') {
      const data = {
        id: '',
        admin: '',
        status: 0
      };
      if (list.status === 1) {
        data.status = 2;
      }
      if (list.status === 2) {
        data.status = 1;
      }
      data.id = lecture.id;
      data.admin = this.authService.getAdminId();
      this.operationLecture(lecture.name, list.state, data)
    }
  }

  // 讲座上下线
  operationLecture(name, state, data) {

    const config = new DialogOptions({
      title: `您确定要${state}讲座${name}？`,
      message: '',
      buttons: [{
        key: 'topass',
        value: '确定',
        color: 'primary'
      }, {
        key: 'tocancel',
        value: '取消',
        color: ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'topass') {
        this.toOperationLecture(data);
      }
    });
  }

  toDeleteLecture(data) {
    this.lectureService.lectureStatus(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  toOperationLecture(data) {
    this.lectureService.lectureStatus(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
}
