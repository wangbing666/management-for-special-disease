/**
 * Created by zhanglin on 2017/7/18.
 */
export class Hospital {
  id: number;
  imageUrl: string;
  name: string;
  constructor(obj?: Hospital ) {
    this.id = obj && obj.id || 0;
    this.imageUrl = obj && obj.imageUrl || '';
    this.name = obj && obj.name || '';
  }
}
