import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'integral-commodity',
  loadChildren: 'app/pci/manage-integral/integral-commodity/integral-commodity.module#IntegralCommodityModule'
}, {
  path: 'integral-order',
  loadChildren: 'app/pci/manage-integral/integral-order/integral-order.module#IntegralOrderModule'
}, {
  path: 'integral-detail',
  loadChildren: 'app/pci/manage-integral/integral-detail/integral-detail.module#IntegralDetailModule'
}, {
  path: 'integral-proportion',
  loadChildren: 'app/pci/manage-integral/integral-proportion/integral-proportion.module#IntegralProportionModule'
}, {
  path: 'mission-integral',
  loadChildren: 'app/pci/manage-integral/mission-Integral/mission-Integral.module#MissionIntegralModule'
}];

export const stores = {
  integralCommodity: createReducer('integralCommodity', [0], {}),
  integralOrder: createReducer('integralOrder', [0], {}),
  integralDetail: createReducer('integralDetail', [0, 0], {}),
  integralProportion: createReducer('integralProportion', [0], {})
};
