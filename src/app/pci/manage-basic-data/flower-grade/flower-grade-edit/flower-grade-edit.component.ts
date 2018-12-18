import { Component, OnInit } from '@angular/core';
import { FlowerGradeService } from '../_service/flower-grade.service';
import { FlowerGradeFormService } from '../_service/flower-grade-form.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FlowerGrade } from '../_entity/flower-grade.entity';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-flower-grade-edit',
  templateUrl: './flower-grade-edit.component.html'
})
export class FlowerGradeEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['flowerGrade', 'data']) flowerGrade: Observable<FlowerGrade>;
  errMsg = '';
  form: any;
  flowerGradeId: number;

  constructor(
    private flowerGradeService: FlowerGradeService,
    private flowerGradeFormService: FlowerGradeFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.flowerGrade.subscribe(data => {
        this.flowerGradeId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.flowerGradeService.flowerGradeEditConfig(true);
          this.form = this.flowerGradeFormService.setForm();
        } else {
          this.containerConfig = this.flowerGradeService.flowerGradeEditConfig(false);
          this.form = this.flowerGradeFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.flowerGradeId !== 0) {
      this.flowerGradeService.flowerGradeEdit(value.id, value.title, value.imgUrl, value.value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/flower-grade']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.flowerGradeService.flowerGradeCreate(value.title, value.imgUrl, value.value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/flower-grade']);
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
