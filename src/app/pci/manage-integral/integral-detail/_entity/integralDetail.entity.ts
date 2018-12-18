/**
 * Created by zhanglin on 2017/7/14.
 */
export class IntegralDetail {
  id: number;
  tel: string;
  name: string;
  remainingIntegral: string;
  integralTransaction: string;
  content: string;

  constructor(obj?: IntegralDetail) {
    this.id = obj && obj.id || 0;
    this.tel = obj && obj.tel || '';
    this.name = obj && obj.name || '';
    this.remainingIntegral = obj && obj.remainingIntegral || '';
    this.integralTransaction = obj && obj.integralTransaction || '';
    this.content = obj && obj.content || '';
  }
}
