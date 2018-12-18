/**
 * Created by zhanglin on 2017/7/18.
 */
export class VersionControl {
  id: number;
  version: string;
  title: string;
  content: string;
  url: string;
  platformName: string;
  productName: string;
  hardName: string;
  createdDate: string;
  adminId: number;
  constructor(obj?: VersionControl) {
    this.id = obj && obj.id || 0;
    this.version = obj && obj.version || '';
    this.title = obj && obj.title || '';
    this.content = obj && obj.content || '';
    this.url = obj && obj.url || '';
    this.platformName = obj && obj.platformName || '';
    this.productName = obj && obj.productName || '';
    this.hardName = obj && obj.hardName || '';
    this.createdDate = obj && obj.createdDate || '';
    this.adminId = obj && obj.adminId || 0;
  }
}
