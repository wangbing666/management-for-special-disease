import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorService } from '../_service/doctor.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  containerConfig: ContainerConfig;

  auditedTable: TableOption;
  selectedItems: Array<any> = [];
  queryKey = '';

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorMessageConfig();
    this.auditedTable = new TableOption();
    this.getAuditedDoctors(0);
  }

  reset() {
    this.queryKey = '';
    this.getAuditedDoctors(0);
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.reset(page);
    this.doctorService.getAllDoctors(
      this.queryKey, '', page, 12)
      .subscribe(res => {
        this.auditedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditedTable.totalPage = res.data.totalPages;
          this.auditedTable.lists = res.data.content;
        } else {
          this.auditedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.auditedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  selectItem(item) {
    let target = true;
    this.selectedItems.forEach(obj => {
      if (item.id === obj.id) {
        target = false;
      }
    });
    if (target) {
      this.selectedItems.unshift(item);
    }
  }

  selectAll() {
    this.doctorService.getAllDoctors('', '', 0, 999999)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content) {
          let auditedLists = res.data.content;
          const ids = [];
          this.selectedItems.forEach(obj => {
            ids.push(obj.id);
          });
          auditedLists.forEach(obj => {
            if (ids.indexOf(obj.id) < 0) {
              this.selectedItems.unshift(obj);
            }
          });
        }
      });
    // if (this.auditedTable.lists) {
    //   const ids = [];
    //   this.selectedItems.forEach(obj => {
    //     ids.push(obj.id);
    //   });
    //   this.auditedTable.lists.forEach(obj => {
    //     if (ids.indexOf(obj.id) < 0) {
    //       this.selectedItems.push(obj);
    //     }
    //   })
    // }
  }

  clearAll() {
    this.selectedItems = [];
  }

  removeItem(item) {
    let index;
    this.selectedItems.forEach((obj, i) => {
      if (item.id === obj.id) {
        index = i;
      }
    });
    this.selectedItems.splice(index, 1);
  }

  onSubmit(value) {
    if (this.selectedItems.length !== 0) {
      const ids = [];
      this.selectedItems.forEach(obj => {
        ids.push(obj.id);
      });
      this.doctorService.sendMessage({
        content: value.message,
        doctorIds: ids
      }).subscribe(
        res => {
          if (res.code === 0) {
            HintDialog('短信发送成功', this.dialog);
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    }
  }
}
