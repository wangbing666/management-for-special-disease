import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { CommunityService } from './_service/community.service';
import { CommunityTableService } from './_service/community-table.service';
import { Community } from './_entity/community.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
})
export class CommunityComponent implements OnInit {
  containerConfig: ContainerConfig;
  communityTable: TableOption;

  constructor(
    @Inject('action') private action,
    private doctorService: CommunityService,
    private doctorTableService: CommunityTableService,
    private router: Router,
    private dialog: MatDialog
  ) {
    action.dataChange('community', new Community());
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.communityConfig();
    this.communityTable = new TableOption({
      titles: this.doctorTableService.setCommunityTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getCommunityList(0);
  }

  getCommunityList(page: number) {
    this.doctorService.getCommunity(
      page, this.communityTable.size)
      .subscribe(res => {
        this.communityTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.communityTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.communityTable.lists = res.data.content;
        } else {
          this.communityTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.communityTable.loading = false;
        console.log(err);
        this.communityTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('community', new Community());
    this.router.navigate(['/community/edit']);
  }

  gotoHandle(res) {
    const community = <Community>res.value;
    if (res.key === 'geography') {
      const config = new MatDialogConfig();
      config.data = community;
      this.dialog.open(DialogComponent, config);
    }
    if (res.key === 'edit') {
      this.action.dataChange('community', community);
      this.router.navigate(['/community/edit']);
    }
  }
}

@Component({
  selector: 'app-community-map',
  templateUrl: './community-dialog.html',
})
export class DialogComponent implements OnInit {
  option: any;
  opts: any;
  offlineOpts: OfflineOptions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    console.log(data);
    this.option = this.data
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
        title: this.option && this.option.communityName || '',
        content: this.option && this.option.communityAddress || '',
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

