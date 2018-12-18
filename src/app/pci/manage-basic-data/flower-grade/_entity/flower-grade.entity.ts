/**
 * Created by zhanglin on 2017/7/18.
 */
export class FlowerGrade {
  id: number;
  imageUrl: string;
  title: string;
  value: string;
  constructor(obj?: FlowerGrade) {
    this.id = obj && obj.id || 0;
    this.imageUrl = obj && obj.imageUrl || '';
    this.title = obj && obj.title || '';
    this.value = obj && obj.value || '';
  }
}
