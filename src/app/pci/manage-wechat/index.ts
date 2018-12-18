import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'assessment-risk',
  loadChildren: 'app/pci/manage-wechat/assessment-risk/assessment-risk.module#AssessmentRiskModule'
}, {
  path: 'auto-reply',
  loadChildren: 'app/pci/manage-wechat/auto-reply/auto-reply.module#AutoReplyModule'
}, {
  path: 'custom-menu',
  loadChildren: 'app/pci/manage-wechat/custom-menu/custom-menu.module#CustomMenuModule'
}, {
  path: 'family-account',
  loadChildren: 'app/pci/manage-wechat/family-account/family-account.module#FamilyAccountModule'
}, {
  path: 'lecture',
  loadChildren: 'app/pci/manage-wechat/lecture/lecture.module#LectureModule'
}];

export const stores = {
  lecture: createReducer('lecture', [0], {})
};
