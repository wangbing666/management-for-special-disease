import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'followUp-plan',
  loadChildren: 'app/pci/manage-followUp/followUp-plan/followUp-plan.module#FollowPlanModule'
}, {
  path: 'followUp-feedback',
  loadChildren: 'app/pci/manage-followUp/followUp-feedback/followUp-feedback.module#FollowFeedbackModule'
}];

export const stores = {
  followPlan: createReducer('followPlan', [0], {}),
  followFeedback: createReducer('followFeedback', [0], {})
};
