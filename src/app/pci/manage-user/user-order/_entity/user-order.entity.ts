export class UserOrder {
  id: string;
  purchaser: string;
  state: boolean;

  constructor(obj?: UserOrder) {
    this.id = obj && obj.id || '';
    this.purchaser = obj && obj.purchaser || '';
    this.state = obj && obj.state || null;
  }
}
