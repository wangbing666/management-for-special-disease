import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

@Injectable()
export class OperationPushTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: 'Push内容',
        key: 'content',
      }),
      new TableTitle({
        name: 'Push链接',
        key: 'pushUrl'
      }),
      new TableTitle({
        name: '点击量',
        key: 'click'
      }),
      new TableTitle({
        name: '上传者',
        key: 'operator'
      }),
      new TableTitle({
        name: '发送时间',
        key: 'pushTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'state'
      }),
      new TableTitle({
        name: '发送',
        key: 'send',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
