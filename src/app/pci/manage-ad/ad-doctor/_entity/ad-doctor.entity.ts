export class AdDoctor {
  id: number;
  imageUrl: string;
  title: string;
  linkUrl: string;
  ranking: number;
  click: number;
  admin: string;
  createdDate: string;
  statusName: string;
  constructor(obj?: AdDoctor) {
    this.id = obj && obj.id || 0;
    this.imageUrl = obj && obj.imageUrl || '';
    this.title = obj && obj.title || '';
    this.linkUrl = obj && obj.linkUrl || '';
    this.ranking = obj && obj.ranking || 0;
    this.click = obj && obj.ranking || 0;
    this.admin = obj && obj.admin || '';
    this.createdDate = obj && obj.createdDate || '';
    this.statusName = obj && obj.statusName || '';
  }
}
