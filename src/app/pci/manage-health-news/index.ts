import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'health-news',
  loadChildren: 'app/pci/manage-health-news/health-news.module#HealthNewsModule'
}];

export const stores = {
  healthNews: createReducer('healthNews', [0], {}),
};
