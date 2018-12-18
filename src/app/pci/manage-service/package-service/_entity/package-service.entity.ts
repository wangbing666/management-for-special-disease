/**
 * Created by zhanglin on 2017/7/18.
 */
export class PackageService {
  id: number;
  iconUrl: string;
  name: string;
  groupName: string;
  packageServiceName: string;
  thirdServiceList: string;
  operator: string;
  createdDate: string;
  enableName: string;
  constructor(obj?: PackageService) {
    this.id = obj && obj.id || 0;
    this.iconUrl = obj && obj.iconUrl || '';
    this.name = obj && obj.name || '';
    this.groupName = obj && obj.groupName || '';
    this.packageServiceName = obj && obj.packageServiceName || '';
    this.thirdServiceList = obj && obj.thirdServiceList || '';
    this.operator = obj && obj.operator || '';
    this.createdDate = obj && obj.createdDate || '';
    this.enableName = obj && obj.enableName || '';
  }
}
