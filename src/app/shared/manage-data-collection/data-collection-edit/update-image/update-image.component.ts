import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DataCollectionService } from '../../_service/data-collection.service';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG} from '../../../../pci/_store/static';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
})
export class UpdateImageComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;

  constructor(
    @Inject('app') private app,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private dataCollectionService: DataCollectionService
  ) {

  }

  ngOnInit() {
    this.getImgList();
    this.containerConfig = this.dataCollectionService.updateImageConfig();
  }

  getImgList() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.dataCollectionService.getImageList(id)
        .subscribe(res => {
          if (res.code === 0 && res.data) {
            let list = [];
            for (let i = 0; i < res.data.length; i ++ ) {
              list.push(res.data[i].imgUrl)
            }
            this.createForm(id, list);
          } else {
            HintDialog(res && res.msg || '访问数据出错啦～', this.dialog);
          }
        }, err => {
          HintDialog('啊哦～访问接口出错啦～', this.dialog);
          throw new Error(err);
        })
    })
  }

  createForm(id, list) {
    this.form = this.fb.group({
      id: new FormControl(Validators.required),
      imglist: new FormControl(Validators.required)
    });
    this.config = {
      id: new FormHidden({
        key: 'id',
        label: '医院ID',
        value: id || '',
      }),
      imglist: new FormFile({
        label: '病史图片',
        key: 'imglist',
        multiple: true,
        value: list || '',
        url: `${this.app.pci.BASE_URL}api/upload/list`,
      })
    }
  }

  getValues(value) {
    this.dataCollectionService.UpdateImage(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/data-collection']);
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

