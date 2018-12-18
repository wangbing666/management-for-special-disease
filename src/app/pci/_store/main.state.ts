export interface IMainState {
  readonly adminId: number;
  readonly adminName: string;
  readonly navigation: Navbar[];
}

export class Navbar {
  key: string;
  title: string;
  link: string;
  tag: number;
  ifSub: boolean;
  active: boolean;
  open: boolean;
  subBars: Navbar[];

  constructor(obj ?: any) {
    this.key = obj && obj.key || '';
    this.title = obj.title || '';
    this.link = obj.link || '';
    this.tag = obj.tag || null;
    this.open = !!obj.open;
    this.ifSub = !!obj.ifSub;
    this.subBars = obj.subBars || [];
  }
}

export class Admin {
  id: number;
  name: string;

  constructor(obj?: Admin) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
  }
}
export class InitPayload {
  path: string;
}
export class TagPayload {
  key: string;
  group: string;
  tag: number;
}
