import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'ad-doctor',
  loadChildren: 'app/pci/manage-ad/ad-doctor/ad-doctor.module#AdDoctorModule'
}, {
  path: 'ad-patient',
  loadChildren: 'app/pci/manage-ad/ad-patient/ad-patient.module#AdPatientModule'
}];

export const stores = {
  adDoctor: createReducer('adDoctor', [0], {}),
  adPatient: createReducer('adPatient', [0], {}),
};
