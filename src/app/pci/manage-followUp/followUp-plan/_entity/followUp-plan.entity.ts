export class FollowPlan {
  doctorName: string;
  doctorTel: string;
  userName: string;
  userTel: string;
  planDate: string;
  feedbacks: Array<any>;

  constructor(obj?: FollowPlan) {
    this.doctorName = obj && obj.doctorName || '';
    this.doctorTel = obj && obj.doctorTel || '';
    this.userName = obj && obj.userName || '';
    this.userTel = obj && obj.userTel || '';
    this.planDate = obj && obj.planDate || '';
    this.feedbacks = obj && obj.feedbacks || [];
  }
}
