import { Component, Inject, OnInit } from '@angular/core';
import { VersionControlService } from './_service/version-control.service';
import { VersionControlTableService } from './_service/version-control-table.service';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { ERRMSG } from '../_store/static';
import { VersionControl } from './_entity/version-control.entity';

@Component({
  selector: 'app-version-control',
  templateUrl: 'version-control.component.html'
})
export class VersionControlComponent implements OnInit {
  containerConfig: ContainerConfig;
  versionControlTable: TableOption;
  @select(['versionControl', 'tab']) tab: Observable<number>;
  @select(['versionControl', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private versionControlService: VersionControlService,
    private versionControlTableService: VersionControlTableService,
    private router: Router
  ) {
    action.dataChange('versionControlService', new VersionControl());
  }

  ngOnInit() {
    this.containerConfig = this.versionControlService.versionControlConfig();
    this.versionControlTable = new TableOption({
      titles: this.versionControlTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getversionControl(page[0]);
    });
  }

  getversionControl(page: number) {
    this.versionControlService.getVersionControls(page, 20)
      .subscribe(res => {
        this.versionControlTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.versionControlTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.versionControlTable.totalPage = res.data.totalPages;
          this.versionControlTable.lists = res.data.content;
        } else {
          this.versionControlTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.versionControlTable.loading = false;
        console.log(err);
        this.versionControlTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('versionControl', new VersionControl());
    this.router.navigate(['/version-control/edit']);
  }

  gotoHandle(res) {
    const versionControl = <VersionControl>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('versionControl', versionControl);
      this.router.navigate(['/version-control/edit']);
    }
  }
}
