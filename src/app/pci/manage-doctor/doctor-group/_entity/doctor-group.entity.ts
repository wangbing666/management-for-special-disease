export class DoctorGroup {
  id: number;
  groupName: string;
  name: string;
  managerNames: string;
  memberNames: string;
  description: string;

  constructor(obj?: DoctorGroup) {
    this.id = obj && obj.id || 0;
    this.groupName = obj && obj.groupName || '';
    this.name = obj && obj.name || '';
    this.managerNames = obj && obj.managerNames || '';
    this.memberNames = obj && obj.memberNames || '';
    this.description = obj && obj.description || '';
  }
}
