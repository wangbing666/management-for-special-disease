import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { HospitalService } from '../_service/hospital.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { Hospital } from '../_entity/hospital.entity';

declare var BMap: any;

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['hospital', 'data']) hospital: Observable<Hospital>;
  opts: any;
  id: any;
  map: any;
  search: any;
  offlineOpts: OfflineOptions;
  errMsg = '';
  form: FormGroup;
  config: any;
  hospitalId: number;
  baidu: any;

  constructor(
    @Inject('app') private app,
    private hospitalService: HospitalService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    const self = this;
    this.hospital.subscribe(data => {
        if (data.id === 0) {
          this.containerConfig = this.hospitalService.hospitalEditConfig(true);
          this.createForm();
          setTimeout(function () {
            self.getMapShow();
          }, 200);
        } else {
          this.containerConfig = this.hospitalService.hospitalEditConfig(false);
          this.id = data.id;
          this.createForm(data);
          setTimeout(function () {
            self.getMapShow(data);
          }, 200);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      imageUrl: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      hospitalAddress: new FormControl({value: ''}, Validators.required),
      longitude: new FormControl({value: ''}, Validators.required),
      latitude: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      imageUrl: new FormFile({
        label: '医院图片',
        key: 'imageUrl',
        value: data && data.imageUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
      }),
      name: new FormText({
        label: '医院名称',
        key: 'name',
        value: data && data.name || ''
      }),
      hospitalAddress: new FormText({
        label: '医院地点',
        key: 'hospitalAddress',
        value: data && data.hospitalAddress || ''
      }),
      longitude: new FormText({
        label: '小区经度',
        key: 'longitude',
        value: data && data.longitude || '',
        disabled: true
      }),
      latitude: new FormText({
        label: '小区纬度',
        key: 'latitude',
        value: data && data.latitude || '',
        disabled: true
      }),
      enable: new FormDropdown({
        label: '状态',
        key: 'enable',
        value: data && data.enable || '',
        options: [
          {id: '1', name: '启用'},
          {id: '0', name: '禁用'}
        ],
      })
    }
  }

  // 搜索地点
  getSerah() {
    const self = this;
    this.search = this.config.hospitalAddress.value;
    const local = new BMap.LocalSearch(this.map, {
      renderOptions: {map: this.map}
    });
    local.search(this.search);
    this.map.addEventListener('click', function (e) {
      const pt = e.point;
      self.config.longitude.value = pt.lng;
      self.config.latitude.value = pt.lat;
    })
  }

  // 显示地图
  getMap(data) {
    this.opts = {
      center: {
        longitude: data && data.longitude || 121.506384,
        latitude: data && data.latitude || 31.245229,
      },
      zoom: 15,
      markers: [{
        longitude: data && data.longitude || 121.506384,
        latitude: data && data.latitude || 31.245229,
        title: data && data.name || '东方明珠',
        content: data && data.hospitalAddress || '上海市浦东区世纪大道1号 ',
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

  loadMap(map: any) {
    console.log('map instance here', map);
    this.map = map;
  }

  // 单机地图坐标, 打印信息
  clickMarker(marker: any) {
    console.log('The clicked marker is', marker.getPosition());
  }

// 延时200毫秒加载，防止地图无法显示
  getMapShow(data?) {
    this.getMap(data);
    this.baidu = true;
  }

  getValues(value) {
    if (this.id) {
      value.id = this.id;
      this.hospitalService.hospitalEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/hospital']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.hospitalService.hospitalCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/hospital']);
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
