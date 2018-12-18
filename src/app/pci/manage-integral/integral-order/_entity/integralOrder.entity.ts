/**
 * Created by zhanglin on 2017/7/17.
 */
export class IntegralOrder {
  id: number;
  name: string;
  trackingNum: string;
  title: string;
  processStatus: number;
  key: string;
  goodsName: string;
  constructor(obj?: IntegralOrder) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.trackingNum = obj && obj.trackingNum || '';
    this.title = obj && obj.title || '';
    this.processStatus = obj && obj.processStatus || 0;
    this.key = obj && obj.key || '';
    this.goodsName = obj && obj.goodsName || '';
  }
}
