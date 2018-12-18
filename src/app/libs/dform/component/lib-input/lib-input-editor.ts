import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity/form-text';
import * as WangEditor from 'wangeditor';

@Component({
  selector: 'app-input-editor',
  template: `
    <div [formGroup]="form">
      <div class="input_container" style="padding-top: 2em">
        <div #editor></div>
        <!--<quill-editor calss="input_content"-->
        <!--[formControlName]="data.key"-->
        <!--[(ngModel)]="value"-->
        <!--[options]="editorOptions"-->
        <!--&gt;</quill-editor>-->
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value">
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('editor') editorRef: ElementRef;

  editor: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = new WangEditor(this.editorRef.nativeElement);
    // 关闭粘贴样式的过滤
    this.editor.customConfig.pasteFilterStyle = true;
    // 使用 base64 保存图片
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.onchange = (html) => {
      this.value = html;
      this.valueChange.emit(html);
    };
    this.editor.create();
    this.editor.txt.html(this.value);
  }

  ngOnDestroy() {
    this.editor = null;
  }
}
