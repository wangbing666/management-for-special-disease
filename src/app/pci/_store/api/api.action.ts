import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { IApiState } from './api.state';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ApiAction {
  static TAB_CHANGE = 'TAB_CHANGE';
  static PAGE_CHANGE = 'PAGE_CHANGE';
  static DATA_CHANGE = 'DATA_CHANGE';

  constructor(private ngRedux: NgRedux<IApiState<any>>) {
  }

  tabChange(key, tab: number) {
    this.ngRedux.dispatch({type: ApiAction.TAB_CHANGE + key, payload: tab});
  }

  pageChange(key, page: Array<number>) {
    this.ngRedux.dispatch({type: ApiAction.PAGE_CHANGE + key, payload: page});
  }

  dataChange(key, data: any) {
    this.ngRedux.dispatch({type: ApiAction.DATA_CHANGE + key, payload: data});
  }
}

export class TabChangeAction implements Action {
  readonly type = ApiAction.TAB_CHANGE;

  constructor(public payload: number) {
  }
}

export class PageChangeAction implements Action {
  readonly type = ApiAction.PAGE_CHANGE;

  constructor(public payload: Array<number>) {
  }
}

export class DataChangeAction implements Action {
  readonly type = ApiAction.DATA_CHANGE;

  constructor(public payload: any) {
  }
}
