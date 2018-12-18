import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

const PATH = {
  login: 'api/login', // 登陆
};

@Injectable()
export class AuthService {
  JWT_KEY = 'pci_login_token';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  @select(['main', 'adminName']) adminName: Observable<string>;
  @select(['main', 'adminId']) adminId: Observable<number>;

  constructor(
    private router: Router,
    @Inject('app') public app,
    @Inject('http') public httpService,
    @Inject('main') public mainAction
  ) {
  }

  setJwt(jwt: string) {
    window.sessionStorage.setItem(this.JWT_KEY, jwt);
  }

  login(creds) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.login}`, creds);
  }

  logout() {
    window.sessionStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['/login']);
    this.redirectUrl = '';
    this.mainAction.delAdmin();
  }

  isAuthorized(): boolean {
    const admin = window.sessionStorage.getItem(this.JWT_KEY);
    if (admin) {
      this.mainAction.setAdmin({id: JSON.parse(admin).id, name: JSON.parse(admin).name});
    }
    return Boolean(admin);
  }

  getAdminName(): string {
    let name: string;
    this.adminName.subscribe(res => {
      name = res;
    });
    return name;
  }

  getAdminId(): number {
    let id: number;
    this.adminId.subscribe(res => {
      id = res;
    });
    return id;
  }
}
