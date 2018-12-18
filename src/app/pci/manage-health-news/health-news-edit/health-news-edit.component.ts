import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../libs/dform/_entity/form-textarea';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { HealthNewsService } from '../_service/health-news.service';
import { HealthNews } from '../_entity/health-news.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-health-news-edit',
  templateUrl: './health-news-edit.component.html'
})
export class HealthNewsEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['healthNews', 'data']) healthNews: Observable<HealthNews>;
  errMsg = '';
  form: any;
  config: any;
  id: any;

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    private healthNewsService: HealthNewsService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.healthNews.subscribe(data => {
      if (data.id > 0 && data.typeList) {
        this.id = data.id;
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(false);
        this.createForm(data.typeList, data);
      } else if (data.typeList) {
        this.containerConfig = this.healthNewsService.healthNewsEditConfig(true);
        this.createForm(data.typeList);
      }
      this.cdr.detectChanges();
    });
  }

  createForm(list, data?) {
    this.form = this.fb.group({
      articleTypeId: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
      type: new FormControl('', Validators.required),
      link: new FormControl(''),
      richText: new FormControl(''),
      author: new FormControl(''),
      ranking: new FormControl(''),
      online: new FormControl(''),
      adminId: new FormControl('')
    });
    this.config = {
      articleTypeId: new FormDropdown({
        key: 'articleTypeId',
        label: '健康资讯分类',
        options: list,
        value: data && data.articleType || ''
      }),
      imageUrl: new FormFile({
        key: 'imageUrl',
        label: '资讯图片',
        url: this.app.pci.UPLOAD_URL,
        value: data && data.imageUrl || ''
      }),
      title: new FormText({
        key: 'title',
        label: '资讯标题',
        value: data && data.title || ''
      }),
      content: new FormTextarea({
        key: 'content',
        label: '资讯简介',
        value: data && data.content || ''
      }),
      type: new FormRadio({
        label: '类型',
        key: 'type',
        options: [{
          id: 0,
          name: '链接'
        }, {
          id: 1,
          name: '内容'
        }],
        value: data && (data.type == 0 ? data.type : data.type || '')
      }),
      link: new FormText({
        key: 'link',
        label: '资讯链接',
        value: data && data.link || ''
      }),
      richText: new FormText({
        key: 'richText',
        label: '资讯内容',
        value: data && data.richText || ''
      }),
      author: new FormText({
        key: 'author',
        label: '作者',
        value: data && data.author || ''
      }),
      ranking: new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && (data.ranking == 0 ? data.ranking : data.ranking || '')
      }),
      online: new FormRadio({
        key: 'online',
        label: '是否上架',
        options: [{
          id: true,
          name: '上架'
        }, {
          id: false,
          name: '下架'
        }],
        value: data && (data.online == 0 ? data.online : data.online || '')
      }),
      adminId: new FormHidden({
        key: 'adminId',
        label: '',
        value: this.auth.getAdminId()
      }),
    }
  }

  getValues(value) {
    if (this.id) {
      value.id = this.id;
      this.healthNewsService.healthNewsUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-news']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.healthNewsService.healthNewsCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/health-news']);
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
