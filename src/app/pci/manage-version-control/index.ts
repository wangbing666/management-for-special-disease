import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'version-control',
  loadChildren: 'app/pci/manage-version-control/version-control.module#VersionControlModule'
}];

export const stores = {
  versionControl: createReducer('versionControl', [0], {})
};
