import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { Navbar } from '../_store/main.state';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @select(['main', 'adminName']) readonly username: Observable<string>;
  @select(['main', 'navigation']) readonly sidebars: Observable<Navbar[]>;

  constructor(
    @Inject('nav') private navService,
    @Inject('auth') private authService
  ) {
  }

  ngOnInit() {
    this.initSidebars();
  }

  ngAfterViewInit() {
    // const container = document.getElementById('container');
    // Ps.initialize(container, {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   suppressScrollX: true
    // });
    // Ps.update(container);
  }

  initSidebars() {
    const path = window.location.pathname.split('/')[1];
    this.navService.initSidebars(path);
    this.setCount();
  }

  setCount() {
    this.navService.getCount().subscribe(res => {
      if (res.code === 0 && res.data) {
        const count = res.data;
        this.navService.setCount(count.doctorAuditing, 'doctorgroup', 'doctor');
        this.navService.setCount(count.serviceAuditing, 'doctorgroup', 'doctorgroup');
        this.navService.setCount(count.purchase + count.withdraw, 'doctorgroup', 'doctoraccount');
        this.navService.setCount(count.refundSum + count.thirdSum, 'user', 'userorder');
        this.navService.setCount(count.failure, 'user', 'usercertification');
        this.navService.setCount(count.goods, 'integral', 'integralOrder');
      }
    });
  }

  toggleSub(sidebar) {
    sidebar.open = !sidebar.open;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    console.log('destroy navigation')
  }

}
