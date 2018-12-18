import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

@Injectable()
export class DataCollectionTableService {

  setWaitingTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      // new TableTitle({
      //   name: '实名认证',
      //   key: 'authenticate'
      // }),
      new TableTitle({
        name: '注册时间',
        key: 'registerDate'
      }),
      new TableTitle({
        name: '来源渠道',
        key: 'doctorHospitalName'
      }),
      // new TableTitle({
      //   name: '年龄',
      //   key: 'age'
      // }),
      // new TableTitle({
      //   name: '性别',
      //   key: 'sex'
      // }),
      // new TableTitle({
      //   name: '手术医院',
      //   key: 'hospitalName',
      // }),
      // new TableTitle({
      //   name: '手术医生',
      //   key: 'doctorName'
      // }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '资料录入',
        key: 'dataTypein',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '暂不处理',
        key: 'keepData',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }

  setAuditingTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      // new TableTitle({
      //   name: '实名认证',
      //   key: 'authenticate'
      // }),
      // new TableTitle({
      //   name: '年龄',
      //   key: 'age'
      // }),
      // new TableTitle({
      //   name: '性别',
      //   key: 'sex'
      // }),
      new TableTitle({
        name: '病历医院',
        key: 'hospitalName'
      }),
      // new TableTitle({
      //   name: '手术医生',
      //   key: 'hospitalName'
      // }),
      new TableTitle({
        name: '提交时间',
        key: 'submitDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '录入人',
        key: 'inputName'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditorName'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '查看资料',
        key: 'editData',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }

  setAuditedTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      // new TableTitle({
      //   name: '实名认证',
      //   key: 'authenticate'
      // }),
      // new TableTitle({
      //   name: '年龄',
      //   key: 'age'
      // }),
      // new TableTitle({
      //   name: '性别',
      //   key: 'sex'
      // }),
      // new TableTitle({
      //   name: '手术医院',
      //   key: 'hospitalName'
      // }),
      // new TableTitle({
      //   name: '手术医生',
      //   key: 'doctorName'
      // }),
      new TableTitle({
        name: '病历医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '审核通过时间',
        key: 'auditDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '录入人',
        key: 'inputName'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditorName'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '查看资料',
        key: 'showData',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '下线',
        key: 'tapeOut',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  setUnhandledTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      // new TableTitle({
      //   name: '实名认证',
      //   key: 'authenticate'
      // }),
      // new TableTitle({
      //   name: '年龄',
      //   key: 'age'
      // }),
      // new TableTitle({
      //   name: '性别',
      //   key: 'sex'
      // }),
      // new TableTitle({
      //   name: '手术医院',
      //   key: 'hospitalName'
      // }),
      // new TableTitle({
      //   name: '手术医生',
      //   key: 'doctorName'
      // }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '备注',
        key: 'remark'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '录入资料',
        key: 'dataTypein',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
  setDefeatedTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '病历医院',
        key: 'hospitalName'
      }),
      // new TableTitle({
      //   name: '实名认证',
      //   key: 'authenticate'
      // }),
      // new TableTitle({
      //   name: '年龄',
      //   key: 'age'
      // }),
      // new TableTitle({
      //   name: '性别',
      //   key: 'sex'
      // }),
      // new TableTitle({
      //   name: '手术医院',
      //   key: 'hospitalName'
      // }),
      // new TableTitle({
      //   name: '手术医生',
      //   key: 'doctorName'
      // }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '失败理由',
        key: 'failedReason',
        maxwidth: 200
      }),
      new TableTitle({
        name: '录入人',
        key: 'inputName'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '录入资料',
        key: 'dataTypein',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
