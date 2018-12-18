import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'operation-push',
  loadChildren: 'app/pci/manage-operation-push/operation-push.module#OperationPushModule'
}];

export const stores = {
  operationPush: createReducer('operationPush', [0, 0], {})
};
