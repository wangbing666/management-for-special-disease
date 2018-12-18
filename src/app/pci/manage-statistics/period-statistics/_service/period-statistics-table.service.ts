import { Injectable } from '@angular/core';
import { TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class PeriodStatisticsTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '时间段内启动总次数',
        key: 'totalLoginCount'
      }),
      new TableTitle({
        name: '启动人数',
        key: 'loginGroupCount'
      }),
      new TableTitle({
        name: '启动率',
        key: 'loginRate'
      }),
      new TableTitle({
        name: '人均时间段启动数',
        key: 'averageLogin'
      })
    ];

    return Titles;
  }
}
