import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { CommunityService } from '../_service/community.service';
import { Community } from '../_entity/community.entity';
import { ERRMSG } from '../../../_store/static';

declare var BMap: any;

@Component({
  selector: 'app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.css']
})
export class CommunityEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['community', 'data']) community: Observable<Community>;
  opts: any;
  id: any;
  map: any;
  search: any;
  offlineOpts: OfflineOptions;
  form: FormGroup;
  longitude: any; // 经度
  latitude: any; // 维度
  config: any;
  errMsg = '';
  state: boolean;
  baidu: any;

  constructor(
    private communityService: CommunityService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    const self = this;
    this.community.subscribe(data => {
      if (data.id === 0) {
        this.containerConfig = this.communityService.communityEditConfig(true);
        this.createForm();
        setTimeout(function () {
          self.getMapShow();
        }, 200);
      } else {
        this.containerConfig = this.communityService.communityEditConfig(false);
        this.id = data.id;
        this.createForm(data);
        setTimeout(function () {
          self.getMapShow(data);
        }, 200);
      }
    });
  }

  createForm(data?) {
    this.form = this.fb.group({
      communityName: new FormControl({value: ''}, Validators.required),
      communityAddress: new FormControl({value: ''}, Validators.required),
      longitude: new FormControl({value: ''}, Validators.required),
      latitude: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      communityName: new FormText({
        label: '小区名称',
        key: 'communityName',
        value: data && data.communityName || ''
      }),
      communityAddress: new FormText({
        label: '小区地点',
        key: 'communityAddress',
        value: data && data.communityAddress || ''
      }),
      longitude: new FormText({
        label: '小区经度',
        key: 'longitude',
        value: data && data.longitude || ''
      }),
      latitude: new FormText({
        label: '小区纬度',
        key: 'latitude',
        value: data && data.latitude || ''
      }),
    }
  }

  // 搜索地点
  getSerah() {
    const self = this;
    this.search = this.config.communityAddress.value;
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
        title: data && data.communityName || '东方明珠',
        content: data && data.communityAddress || '上海市浦东区世纪大道1号 ',
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

  // 延时200毫秒加载地图，防止无法加载
  getMapShow(data?) {
    this.getMap(data);
    this.baidu = true;
  }

  getValues(value) {
    if (this.id) {
      value.id = this.id;
      this.communityService.updateCommunity(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/community']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        })
    } else {
      this.communityService.addCommunity(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/community']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        })
    }
  }
}
