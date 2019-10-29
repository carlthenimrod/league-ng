import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPlacesComponent } from './admin-places.component';
import { AdminPlaceComponent } from './admin-place/admin-place.component';
import { AdminPlaceListComponent } from './admin-place-list/admin-place-list.component';

const routes: Routes = [
  { path: '', component: AdminPlacesComponent, children: [
    { path: ':id', component: AdminPlaceComponent },
    { path: '**', component: AdminPlaceListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPlacesRoutingModule { }
