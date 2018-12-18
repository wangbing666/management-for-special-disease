/**
 * Created by zhanglin on 2017/7/17.
 */
export class IntegralCommodity {
  id: number;
  picUrl: string;
  title: string;
  integral: string;
  operator: string;
  recordTime: string;
  recommendValue: number;
  goodsStatusName: string;
  freight: number;

  constructor(obj?: IntegralCommodity) {
    this.id = obj && obj.id || 0;
    this.picUrl = obj && obj.picUrl || '';
    this.title = obj && obj.title || '';
    this.integral = obj && obj.integral || '';
    this.operator = obj && obj.operator || '';
    this.recordTime = obj && obj.recordTime || '';
    this.recommendValue = obj && obj.recommendValue || 0;
    this.goodsStatusName = obj && obj.goodsStatusName || '';
    this.freight = obj && obj.freight || 0;
 }
}
