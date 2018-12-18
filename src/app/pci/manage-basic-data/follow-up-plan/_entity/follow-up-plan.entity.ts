export class FollowUpPlan {
  id: number;
  type: any;
  custom: any;
  name: string;

  constructor(obj?: FollowUpPlan) {
    this.id = obj && obj.id || 0;
    this.type = obj && obj.type || '';
    this.custom = obj && obj.custom || '';
    this.name = obj && obj.name || '';
  }
}
