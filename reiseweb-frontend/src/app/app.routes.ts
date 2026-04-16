import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map';
import { PinDetailComponent } from './components/pin-detail/pin-detail';

export const routes: Routes = [
    { path: '', component: MapComponent },
    { path: 'pin/:id', component: PinDetailComponent },
];
