export class Department {
  id: number;
  name: string;
  constructor(obj?: Department) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
  }
}
