import { Component, Inject, OnInit } from '@angular/core';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FlowerGradeService } from './_service/flower-grade.service';
import { FlowerGradeTableService } from './_service/flower-grade-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FlowerGrade } from './_entity/flower-grade.entity';
import { ERRMSG } from '../../_store/static';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-flower-grade',
  templateUrl: './flower-grade.component.html'
})
export class FlowerGradeComponent implements OnInit {
  containerConfig: ContainerConfig;
  flowerGradeTable: TableOption;
  @select(['flowerGrade', 'tab']) tab: Observable<number>;
  @select(['flowerGrade', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private flowerGradeService: FlowerGradeService,
    private flowerGradeTableService: FlowerGradeTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('flowerGradeService', new FlowerGrade());
  }

  ngOnInit() {
    this.containerConfig = this.flowerGradeService.flowerGradeConfig();
    this.flowerGradeTable = new TableOption({
      titles: this.flowerGradeTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getFlowerGrade();
    });
  }

  getFlowerGrade() {
    this.flowerGradeService.getFlowerGrades()
      .subscribe(res => {
        this.flowerGradeTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.flowerGradeTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.flowerGradeTable.totalPage = res.data.totalPages;
          this.flowerGradeTable.lists = res.data;
        } else {
          this.flowerGradeTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.flowerGradeTable.loading = false;
        console.log(err);
        this.flowerGradeTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('flowerGrade', new FlowerGrade());
    this.router.navigate(['/flower-grade/edit']);
  }

  gotoHandle(res) {
    const flowerGrade = <FlowerGrade>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('flowerGrade', flowerGrade);
      this.router.navigate(['/flower-grade/edit']);
    } else if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${flowerGrade.title}？`,
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
        if (result.key === 'topass') {
          this.delete(res.value.id);
        }
      });
    }
  }

  delete(id: number) {
    this.flowerGradeService.flowerGradeDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.deleteSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getFlowerGrade();
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.deleteError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.deleteError, this.dialog);
      });
  }
}
