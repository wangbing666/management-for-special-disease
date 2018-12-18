import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';
import { Admin, IMainState, InitPayload, TagPayload } from './main.state';

@Injectable()
export class MainAction {
  static SET_ADMIN = 'SET_ADMIN';
  static DEL_ADMIN = 'DEL_ADMIN';
  static INIT_NAV = 'INIT_NAV';
  static UPDATE_NAV = 'UPDATE_NAV';

  constructor(private ngRedux: NgRedux<IMainState>) {
  }

  setAdmin(obj: Admin) {
    this.ngRedux.dispatch({
      type: MainAction.SET_ADMIN,
      payload: obj
    })
  }

  delAdmin() {
    this.ngRedux.dispatch({
      type: MainAction.DEL_ADMIN
    })
  }

  initNav(obj: InitPayload) {
    this.ngRedux.dispatch({
      type: MainAction.INIT_NAV,
      payload: obj
    })
  }

  updateNav(obj: TagPayload) {
    this.ngRedux.dispatch({
      type: MainAction.UPDATE_NAV,
      payload: obj
    })
  }
}

export class SetAdminAction implements Action {
  readonly type = MainAction.SET_ADMIN;

  constructor(public payload: Admin) {
  }
}

export class DelAdminAction implements Action {
  readonly type = MainAction.DEL_ADMIN;

  constructor() {
  }
}

export class InitNavAction implements Action {
  readonly type = MainAction.INIT_NAV;

  constructor(public payload: InitPayload) {
  }
}

export class UpdateTagAction implements Action {
  readonly type = MainAction.UPDATE_NAV;

  constructor(public payload: TagPayload) {
  }
}
