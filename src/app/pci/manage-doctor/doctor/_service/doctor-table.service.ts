import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorTableService {

  setDoctorAllTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '医生ID',
        key: 'id'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certificationUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '审核通过时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAudited',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }

  setDoctorAuditedTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '医生ID',
        key: 'id'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certificationUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createTime'
      }),
      new TableTitle({
        name: '剩余鲜花',
        key: 'accountBalance'
      }),
      new TableTitle({
        name: '推荐下载',
        key: 'downloadCount'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '医生服务号二维码',
        key: 'qrImage',
        option: '查看',
        controlType: ControlType.button,
      }),
      // new TableTitle({
      //   name: '当前积分',
      //   key: 'integral',
      //   option: '查看',
      //   controlType: ControlType.button,
      // }),
      new TableTitle({
        name: '已开通服务',
        key: 'serviceList',
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '服务明细',
        key: 'serviceDetail',
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAudited',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }

  setDoctorAuditingTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '医生ID',
        key: 'id'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certificationUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '提交时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAuditing',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '通过',
        key: 'pass',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '拒绝',
        key: 'refuse',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  setDoctorFailureTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '医生ID',
        key: 'id'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certificationUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createTime'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '拒绝理由',
        key: 'failureReason',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAuditing',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  setIntegralTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '医生ID',
        key: 'id'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '当前积分',
        key: 'remainingIntegral'
      }),
      new TableTitle({
        name: '项目',
        key: 'content'
      }),
      new TableTitle({
        name: '明细',
        key: 'integralTransaction'
      })
    ];
    return Titles;
  }

  setServiceDetailTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        maxwidth: 70,
        minwidth: 70
      }),
      new TableTitle({
        name: '入院／就诊时间',
        key: 'treatmentTime',
        maxwidth: 70,
        minwidth: 70
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      })
    ];
    return Titles;
  }

  setServiceListTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '已开通服务',
        key: 'name'
      }),
      new TableTitle({
        name: '价格',
        key: 'price'
      }),
      new TableTitle({
        name: '有效期',
        key: 'cycleNumber'
      }),
      new TableTitle({
        name: '服务详情',
        key: 'description',
      })
    ];
    return Titles;
  }
}
