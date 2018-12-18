import { Component, Inject, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HospitalService } from './_service/hospital.service';
import { HospitalTableService } from './_service/hospital-table.service';
import { Hospital } from './_entity/hospital.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html'
})

export class HospitalComponent implements OnInit {
  containerConfig: ContainerConfig;
  hospitalTable: TableOption;
  @select(['hospital', 'tab']) tab: Observable<number>;
  @select(['hospital', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private hospitalService: HospitalService,
    private hospitalTableService: HospitalTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('hospitalService', new Hospital());
  }

  ngOnInit() {
    this.containerConfig = this.hospitalService.hospitalConfig();
    this.hospitalTable = new TableOption({
      titles: this.hospitalTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getHospital(0);
    });
  }

  getHospital(page) {
    this.hospitalTable.reset(page);
    this.hospitalService.getHospital(page, this.hospitalTable.size)
      .subscribe(res => {
        this.hospitalTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.hospitalTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.hospitalTable.totalPage = res.data.totalPages;
          res.data.content.forEach(obj => {
            obj.enableName = obj.enable == 1 ? '启用' : '禁用';
          });
          this.hospitalTable.lists = res.data.content;
        } else {
          this.hospitalTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.hospitalTable.loading = false;
        console.log(err);
        this.hospitalTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('hospital', new Hospital());
    this.router.navigate(['/hospital/edit']);
  }

  gotoHandle(res) {
    const hospital = <Hospital>res.value;
    if (res.key === 'editHospital') {
      this.action.dataChange('hospital', hospital);
      this.router.navigate(['/hospital/edit']);
    }
    if (res.key === 'geography') {
      const config = new MatDialogConfig();
      config.data = hospital;
      this.dialog.open(DialogComponent, config);
    }
    if (res.key === 'qrcode') {
      this.hospitalService.getHospitalQr(hospital.id)
        .subscribe(sres => {
          if (sres && sres.code == 0 && sres.data) {
            ImageDialog(
              '医院服务号二维码', sres.data, this.dialog,
              `${hospital.name || ''}`
            );
          } else {
            HintDialog('获取医院二维码错误', this.dialog);
          }
        }, err => {
          HintDialog('获取医院二维码网络错误', this.dialog);
          throw new Error(err);
        });
    }
  }
}

@Component({
  selector: 'app-hospital-map',
  templateUrl: './hospital-dialog.html',
})
export class DialogComponent implements OnInit {
  option: any;
  opts: any;
  offlineOpts: OfflineOptions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.option = this.data;
    console.log(this.option);
  }

  ngOnInit() {
    this.opts = {
      center: {
        longitude: this.option && this.option.longitude || '',
        latitude: this.option && this.option.latitude || '',
      },
      zoom: 15,
      markers: [{
        longitude: this.option && this.option.longitude || '',
        latitude: this.option && this.option.latitude || '',
        title: this.option && this.option.name || '',
        content: this.option && this.option.hospitalAdress || '',
        autoDisplayInfoWindow: true,
        enableDragging: true
      }],
      geolocationCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
      },
      scaleCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
      },
      overviewCtrl: {
        isOpen: true
      },
      navCtrl: {
        type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
      }
    };
    this.offlineOpts = {
      retryInterval: 5000,
      txt: 'NO-NETWORK'
    };
  }
}
