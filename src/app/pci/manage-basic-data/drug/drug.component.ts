import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DrugService } from './_service/drug.service';
import { DrugTableService } from './_service/drug-table.service';
import { Drug } from './_entity/drug.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html'
})
export class DrugComponent implements OnInit {
  containerConfig: ContainerConfig;
  drugTable: TableOption;
  @select(['drug', 'tab']) tab: Observable<number>;
  @select(['drug', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private drugService: DrugService,
    private drugTableService: DrugTableService,
    private router: Router
  ) {
    action.dataChange('drugService', new Drug());
  }

  ngOnInit() {
    this.containerConfig = this.drugService.drugConfig();
    this.drugTable = new TableOption({
      titles: this.drugTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getDrug(page[0]);
    });
  }

  getDrug(page: number) {
    this.action.pageChange('drug', [page]);
    this.drugTable.reset(page);
    this.drugService.getDrugs(page, 20)
      .subscribe(res => {
        this.drugTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.drugTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.drugTable.totalPage = res.data.totalPages;
          this.drugTable.lists = res.data.content;
          for (let i = 0; i < this.drugTable.lists.length; i++) {
            this.drugTable.lists[i].enableName = this.formatDrug(this.drugTable.lists[i].enable);
          }
        } else {
          this.drugTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.drugTable.loading = false;
        console.log(err);
        this.drugTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('drug', new Drug());
    this.router.navigate(['/drug/edit']);
  }

  gotoHandle(res) {
    const drug = <Drug>res.value;
    if (res.key === 'editDrug') {
      this.action.dataChange('drug', drug);
      this.router.navigate(['/drug/edit']);
    }
  }

  formatDrug(status) {
    if (status === true) {
      return '启用';
    }
    if (status === false) {
      return '禁用';
    }
    return null;
  }
}
