export class DoctorSort {
  id: number;
  name: string;
  hospital: string;
  department: string;
  jobTitle: string;
  ranking: string;

  constructor(obj?: DoctorSort) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.hospital = obj && obj.hospital || '';
    this.department = obj && obj.department || '';
    this.jobTitle = obj && obj.jobTitle || '';
    this.ranking = obj && obj.ranking || '';
  }
}
