import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorAccountTableService {

  setDoctorAccountTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatar',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号码',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospital'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'department'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitle'
      }),
      new TableTitle({
        name: '收到鲜花',
        key: 'totalRevenue',
        controlType: ControlType.textButton,
        option: '查看'
      }),
      new TableTitle({
        name: '已兑换',
        key: 'totalExpenses',
        controlType: ControlType.textButton,
        option: '查看'
      }),
      new TableTitle({
        name: '剩余',
        key: 'accountBalance'
      })
    ];

    return Titles;
  }

  /**
   * 提现处理
   * @param {[type]} body [description]
   */
  setWithdrawDepositTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '提现人',
        key: 'userName'
      }),
      new TableTitle({
        name: '手机号码',
        key: 'telephone',
        minwidth: 85
      }),
      new TableTitle({
        name: '提现金额',
        key: 'flower'
      }),
      new TableTitle({
        name: '兑换数量',
        key: 'amount'
      }),
      new TableTitle({
        name: '持卡人姓名',
        key: 'cardUserName'
      }),
      new TableTitle({
        name: '持卡人手机号',
        key: 'cardUserTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '银行',
        key: 'bankName'
      }),
      new TableTitle({
        name: '卡号',
        key: 'bankCard'
      }),
      new TableTitle({
        name: '总打款金额',
        key: 'total'
      }),
      new TableTitle({
        name: '提现时间',
        key: 'date',
        minwidth: 70
      }),
      new TableTitle({
        name: '操作',
        key: 'pay',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '处理人',
        key: 'admin'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'adminDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  /**
   * 商品兑换
   * @param {[type]} body [description]
   */
  setCommodityExchangeTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '兑换人',
        key: 'userName'
      }),
      new TableTitle({
        name: '兑换人手机号',
        key: 'telephone',
        minwidth: 85
      }),
      new TableTitle({
        name: '兑换商品',
        key: 'goodsTitle'
      }),
      new TableTitle({
        name: '兑换数量',
        key: 'amount'
      }),
      new TableTitle({
        name: '收货人',
        key: 'addressUserName'
      }),
      new TableTitle({
        name: '收货地址',
        key: 'address'
      }),
      new TableTitle({
        name: '联系手机',
        key: 'addressUserTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'date',
        minwidth: 70
      }),
      new TableTitle({
        name: '快递公司',
        key: 'expressNo'
      }),
      new TableTitle({
        name: '快递单号',
        key: 'expressCompany'
      }),
      new TableTitle({
        name: '输入快递单',
        key: 'editExpress',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '已到货',
        key: 'arrival',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '处理人',
        key: 'admin'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'adminDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  /**
   * 兑换明细
   * @param {[type]} body [description]
   */
  setExchangeDetailTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '兑换商品',
        key: 'goodsTitle'
      }),
      new TableTitle({
        name: '兑换数量',
        key: 'amount'
      }),
      new TableTitle({
        name: '卡号/地址',
        key: 'bankCardOrAddress'
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'exchangeDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '处理人',
        key: 'adminName'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'handleDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  /**
   * 收入明细
   * @param {[type]} body [description]
   */
  setIncomeDetailTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者',
        key: 'userName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'buyDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '开始时间',
        key: 'startDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '结束时间',
        key: 'endDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '回复',
        key: 'reply'
      }),
      new TableTitle({
        name: '收入',
        key: 'value'
      })
    ];

    return Titles;
  }
}
