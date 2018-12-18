/**
 * Created by zhanglin on 2017/7/17.
 */
export class Commodity {
  id: number;
  avatar: string;
  title: string;
  typeName: string;
  flower: string;
  createUserName: string;
  createdDate: string;
  recommendValue: number;
  statusName: string;
  constructor(obj?: Commodity) {
    this.id = obj && obj.id || 0;
    this.avatar = obj && obj.avatar || '';
    this.title = obj && obj.title || '';
    this.typeName = obj && obj.typeName || '';
    this.flower = obj && obj.flower || '';
    this.createUserName = obj && obj.createUserName || '';
    this.createdDate = obj && obj.createdDate || '';
    this.recommendValue = obj && obj.recommendValue || 0;
    this.statusName = obj && obj.statusName || '';
  }
}
