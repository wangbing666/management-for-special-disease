import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorSortService } from './_service/doctor-sort.service';
import { DoctorSortTableService } from './_service/doctor-sort-table.service';
import { DoctorSort } from './_entity/doctor-sort.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-doctor-sort',
  templateUrl: 'doctor-sort.component.html'
})
export class DoctorSortComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorSortTable: TableOption;
  @select(['doctorSort', 'page']) page: Observable<Array<number>>;
  hospitalList: any;
  queryHospital: any;

  constructor(
    @Inject('action') private action,
    private doctorsortService: DoctorSortService,
    private doctorsortTableService: DoctorSortTableService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorsortService.doctorSortConfig();
    this.doctorSortTable = new TableOption({
      titles: this.doctorsortTableService.setTitles(),
      ifPage: true
    });
    this.getHospital();
    this.reset();
  }

  reset(page?) {
    this.doctorSortTable.queryKey = '';
    if (page) {
      this.getDoctorSort(page);
    } else {
      this.page.subscribe((pages: Array<number>) => {
        this.getDoctorSort(pages[0]);
      });
    }
  }

  getDoctorSort(page: number) {
    this.action.pageChange('doctorSort', [page]);
    this.doctorSortTable.reset(page);
    this.doctorsortService.getDoctorRank(
      page,
      this.doctorSortTable.size,
      this.doctorSortTable.queryKey,
      this.queryHospital
    ).subscribe(
      res => {
        this.doctorSortTable.loading = false;
        if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
          this.doctorSortTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.data.content && res.code === 0) {
          this.doctorSortTable.totalPage = res.data.totalPages;
          this.doctorSortTable.lists = res.data.content;
          for (let i = 0; i < this.doctorSortTable.lists.length; i++) {
            this.doctorSortTable.lists[i].hospital = this.doctorSortTable.lists[i].hospital.name;
            this.doctorSortTable.lists[i].department = this.doctorSortTable.lists[i].department.name;
          }
        } else {
          this.doctorSortTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorSortTable.loading = false;
        console.log(err);
        this.doctorSortTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getHospital() {
    this.doctorsortService.getDoctor()
      .subscribe(res => {
        if (res.data && res.code === 0) {
          res.data.unshift({id: '', name: '全部医院'});
          this.hospitalList = res.data;
        }
      });
  }

  gotoHandle(res) {
    const doctorSort = <DoctorSort>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('doctorSort', doctorSort);
      this.router.navigate(['/doctor-sort/edit']);
    }
  }
}
