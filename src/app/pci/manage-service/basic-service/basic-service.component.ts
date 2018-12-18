import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { BasicServiceService } from './_service/basic-service.service';
import { BasicServiceTableService } from './_service/basic-service-table.service';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';
import { BasicService } from './_entity/basic-service.entity';

@Component({
  selector: 'app-basic-service',
  templateUrl: './basic-service.component.html'
})
export class BasicServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  basicServiceTable: TableOption;

  constructor(
    @Inject('action') private action,
    private basicServiceService: BasicServiceService,
    private basicServiceTableService: BasicServiceTableService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.basicServiceService.basicServiceConfig();
    this.basicServiceTable = new TableOption({
      titles: this.basicServiceTableService.setTitles(),
      ifPage: false
    });
    this.getBasicServices();
  }

  getBasicServices() {
    this.basicServiceService.getBasicServices()
      .subscribe(res => {
        this.basicServiceTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.basicServiceTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.basicServiceTable.lists = res.data;
        } else {
          this.basicServiceTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.basicServiceTable.loading = false;
        console.log(err);
        this.basicServiceTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    const basicService = <BasicService>res.value;
    console.log(basicService);
    if (res.key === 'edit') {
      this.action.dataChange('basicService', basicService);
      this.router.navigate(['/basic-service/edit']);
    }
  }

  newData() {
    this.action.dataChange('basicService', {});
    this.router.navigate(['/basic-service/edit']);
  }
}
