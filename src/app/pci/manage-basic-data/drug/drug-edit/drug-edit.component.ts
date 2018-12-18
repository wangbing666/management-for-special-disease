import { Component, OnInit } from '@angular/core';
import { DrugService } from '../_service/drug.service';
import { DrugFormService } from '../_service/drug-form.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Drug } from '../_entity/drug.entity';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html'
})
export class DrugEditComponent implements OnInit {

  containerConfig: ContainerConfig;
  @select(['drug', 'data']) drug: Observable<Drug>;
  errMsg = '';
  form: any;
  drugId: number;

  constructor(
    private drugService: DrugService,
    private drugFormService: DrugFormService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.drug.subscribe(data => {
        this.drugId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.drugService.drugEditConfig(true);
          this.form = this.drugFormService.setForm();
        } else {
          this.containerConfig = this.drugService.drugEditConfig(false);
          this.form = this.drugFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.drugId !== 0) {
      this.drugService.drugEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/drug']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.drugService.drugCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/drug']);
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
