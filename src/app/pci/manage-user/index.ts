import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'user',
  loadChildren: 'app/pci/manage-user/user/user.module#UserModule'
}, {
  path: 'user-order',
  loadChildren: 'app/pci/manage-user/user-order/user-order.module#UserOrderModule'
}, {
  path: 'user-certification',
  loadChildren: 'app/pci/manage-user/user-certification/user-certification.module#UserCertificationModule'
}, {
  path: 'health-data',
  loadChildren: 'app/pci/manage-user/health-data/health-data.module#HealthDataModule'
}, {
  path: 'medication-remind',
  loadChildren: 'app/pci/manage-user/medication-remind/medication-remind.module#MedicationRemindModule'
}, {
  path: 'insurance-certification',
  loadChildren: 'app/pci/manage-user/insurance-certification/insurance-certification.module#InsuranceCertificationModule'
}];

export const stores = {
  user: createReducer('user', [0], {}),
  userOrder: createReducer('userOrder', [0, 0, 0, 0], {}),
  userCertification: createReducer('userCertification', [0, 0, 0, 0], {}),
  healthData: createReducer('healthData', [0, 0, 0, 0], {})
};
