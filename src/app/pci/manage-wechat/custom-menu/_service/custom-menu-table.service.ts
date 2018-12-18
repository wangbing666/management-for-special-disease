import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class CustomMenuTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '#',
        key: 'id'
      }),
      new TableTitle({
        name: '菜单名称',
        key: 'name'
      }),
      new TableTitle({
        name: '响应类型',
        key: 'type'
      }),
      new TableTitle({
        name: '网页链接',
        key: 'url',
        maxwidth: 500
      }),
      new TableTitle({
        name: '显示子菜单',
        key: 'subMenu',
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

  setSubTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '#',
        key: 'id'
      }),
      new TableTitle({
        name: '菜单名称',
        key: 'name'
      }),
      new TableTitle({
        name: '响应类型',
        key: 'type'
      }),
      new TableTitle({
        name: '网页链接',
        key: 'url',
        maxwidth: 500
      }),
      new TableTitle({
        name: '编辑',
        key: 'editSub',
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
