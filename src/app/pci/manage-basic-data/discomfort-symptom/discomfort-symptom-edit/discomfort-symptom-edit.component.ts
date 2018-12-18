import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { DiscomfortSymptomService } from '../_service/discomfort-symptom.service';
import { DiscomfortSymptomFormService } from '../_service/discomfort-symptom-form.service';
import { DiscomfortSymptom } from '../_entity/discomfort-symptom.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-discomfort-symptom-edit',
  templateUrl: './discomfort-symptom-edit.component.html'
})
export class DiscomfortSymptomEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['discomfortSymptom', 'data']) discomfortSymptom: Observable<DiscomfortSymptom>;
  errMsg = '';
  form: any;
  state: boolean;

  constructor(
    private discomfortSymptomService: DiscomfortSymptomService,
    private discomfortSymptomFormService: DiscomfortSymptomFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.discomfortSymptom.subscribe(data => {
      if (data.id === 0 && data.typeList) {
        this.state = false;
        this.containerConfig = this.discomfortSymptomService.discomfortSymptomEditConfig(true);
        this.form = this.discomfortSymptomFormService.setForm(data.typeList);
      } else if (data.typeList) {
        this.state = true;
        this.containerConfig = this.discomfortSymptomService.discomfortSymptomEditConfig(false);
        this.form = this.discomfortSymptomFormService.setForm(data.typeList, data);
      } else {
        this.router.navigate(['/discomfort-symptom']);
      }
    });
  }

  // 提交保存信息
  getValues(value) {
    console.log(value);
    if (this.state) {
      this.discomfortSymptomService.discomfortSymptomEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/discomfort-symptom']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.discomfortSymptomService.discomfortSymptomCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/discomfort-symptom']);
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
