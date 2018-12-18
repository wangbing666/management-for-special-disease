import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'commodity',
  loadChildren: 'app/pci/manage-commodity/commodity.module#CommodityModule'
}];

export const stores = {
  commodity: createReducer('commodity', [0], {})
};
