export class Lecture {
  adminId: boolean;
  id: string;
  contentImgUrl: string;
  signCodeUrl: string;
  imgUrl: string;
  name: string;
  date: string;
  address: string;
  joinLimitDate: string;
  url: string;
  charge: number;
  joinLimitCount: string;
  onlineDate: string;
  admin: number;

  constructor(obj?: Lecture) {
    this.adminId = obj && obj.adminId || null;
    this.id = obj && obj.id || '0';
    this.contentImgUrl = obj && obj.contentImgUrl || '';
    this.signCodeUrl = obj && obj.signCodeUrl || '';
    this.imgUrl = obj && obj.imgUrl || '';
    this.name = obj && obj.name || '';
    this.date = obj && obj.date || '';
    this.address = obj && obj.address || '';
    this.joinLimitDate = obj && obj.joinLimitDate || '';
    this.url = obj && obj.url || '';
    this.charge = obj && obj.charge || 0;
    this.joinLimitCount = obj && obj.joinLimitCount || '';
    this.onlineDate = obj && obj.onlineDate || '';
    this.admin = obj && obj.admin || 0;
  }
}
