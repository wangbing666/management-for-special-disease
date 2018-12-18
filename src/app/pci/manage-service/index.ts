import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'doctor-service',
  loadChildren: 'app/pci/manage-service/doctor-service/doctor-service.module#DoctorServiceModule'
}, {
  path: 'basic-service',
  loadChildren: 'app/pci/manage-service/basic-service/basic-service.module#BasicServiceModule'
}, {
  path: 'health-service',
  loadChildren: 'app/pci/manage-service/health-service/health-service.module#HealthServiceModule'
}, {
  path: 'package-service',
  loadChildren: 'app/pci/manage-service/package-service/package-service.module#PackageServiceModule'
}, {
  path: 'service-spec',
  loadChildren: 'app/pci/manage-service/service-spec/service-spec.module#ServiceSpecModule'
}];

export const stores = {
  basicService: createReducer('basicService', [0], {}),
  healthService: createReducer('healthService', [0], {}),
  packageService: createReducer('packageService', [0], {}),
  serviceSpec: createReducer('serviceSpec', [0], {}),
  doctorService: createReducer('doctorService', [0], {}),
};
