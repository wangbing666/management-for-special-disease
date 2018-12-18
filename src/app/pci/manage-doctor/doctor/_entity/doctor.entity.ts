export class Doctor {
  id: number;
  tel: string;
  name: string;
  hospitalId: number;
  hospitalName: string;
  departmentId: number;
  departmentName: string;
  doctorTitleId: number;
  doctorTitleName: string;
  avatarUrl: string;
  certificationUrl: string;
  description: string;
  // state: boolean;
  statusIndex: number;
  failureReason: string;

  constructor(obj?: Doctor) {
    this.id = obj && obj.id || 0;
    this.tel = obj && obj.tel || '';
    this.name = obj && obj.name || '';
    this.hospitalId = obj && obj.hospitalId || 1;
    this.hospitalName = obj && obj.hospitalName || '';
    this.departmentId = obj && obj.departmentId || 1;
    this.departmentName = obj && obj.departmentName || '';
    this.doctorTitleId = obj && obj.doctorTitleId || 1;
    this.doctorTitleName = obj && obj.doctorTitleName || '';
    this.avatarUrl = obj && obj.avatarUrl || '';
    this.certificationUrl = obj && obj.certificationUrl || '';
    this.description = obj && obj.description || '';
    // this.state = obj && obj.state || null;
    this.statusIndex = obj && obj.statusIndex || null;
  }
}
