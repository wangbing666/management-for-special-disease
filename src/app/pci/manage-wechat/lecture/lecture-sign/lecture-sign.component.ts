import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { LectureService } from '../_service/lecture.service';
import { LectureAuditingTableService } from '../_service/lecture-auditing-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-lecture-sign',
  templateUrl: './lecture-sign.component.html',
})
export class LectureSignComponent implements OnInit {
  containerConfig: ContainerConfig;
  lectureDetailTable: TableOption;

  id: number;
  signStatus: any;
  joinStatus: any;

  constructor(
    private lectureService: LectureService,
    private lectureAuditingTableService: LectureAuditingTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.lectureService.lectureDdetailConfig();
    this.lectureDetailTable = new TableOption({
      titles: this.lectureAuditingTableService.setTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.lectureDetailTable.loading = false;
        this.lectureDetailTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getLectureAuditings(this.id, 0);
      }
    });
  }

  getLectureAuditings(id, page: number) {
    this.lectureDetailTable.reset(page);
    this.lectureService.getApply(
      id,
      this.signStatus || '',
      this.joinStatus || '',
      page,
      0
    )
      .subscribe(
        res => {
          this.lectureDetailTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.lectureDetailTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.lectureDetailTable.totalPage = res.data.totalPages;
            this.lectureDetailTable.lists = res.data.content;
          } else {
            this.lectureDetailTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.lectureDetailTable.loading = false;
          this.lectureDetailTable.errorMessage = ERRMSG.netErrMsg;
        })
  }
}
