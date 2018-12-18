/**
 * Created by zhanglin on 2017/7/31.
 */
import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'green-channel',
  loadChildren: 'app/pci/manage-doctor-personal/green-channel/green-channel.module#GreenChannelModule'
}, {
  path: 'reservation-bed',
  loadChildren: 'app/pci/manage-doctor-personal/reservation-bed/reservation-bed.module#ReservationBedModule'
}];

export const stores = {
  greenChannel: createReducer('greenChannel', [0, 0, 0], {}),
  reservationBed: createReducer('reservationBed', [0, 0, 0], {})
};
