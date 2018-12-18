import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'dc-list',
  loadChildren: 'app/pci/manage-coupon/coupon/coupon.module#CouponModule'
}, {
  path: 'dc-issue',
  loadChildren: 'app/pci/manage-coupon/coupon-issue/coupon-issue.module#CouponIssueModule'
}];

export const stores = {
  coupon: createReducer('coupon', [0], {}),
};

