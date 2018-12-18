import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'activeness-statistics',
  loadChildren: 'app/pci/manage-statistics/activeness-statistics/activeness-statistics.module#ActivenessStatisticsModule'
}, {
  path: 'register-statistics',
  loadChildren: 'app/pci/manage-statistics/register-statistics/register-statistics.module#RegisterStatisticsModule'
}, {
  path: 'period-statistics',
  loadChildren: 'app/pci/manage-statistics/period-statistics/period-statistics.module#PeriodStatisticsModule'
}, {
  path: 'business-statistics',
  loadChildren: 'app/pci/manage-statistics/business-statistics/business-statistics.module#BusinessStatisticsModule'
}, {
  path: 'download-statistics',
  loadChildren: 'app/pci/manage-statistics/download-statistics/download-statistics.module#DownloadStatisticsModule'
}, {
  path: 'hospital-statistics',
  loadChildren: 'app/pci/manage-statistics/hospital-statistics/hospital-statistics.module#HospitalStatisticsModule'
// }, {
//   path: 'father-statistics',
//   loadChildren: 'app/pci/manage-statistics/father-statistics/father-statistics.module#FatherStatisticsModule'
}];
