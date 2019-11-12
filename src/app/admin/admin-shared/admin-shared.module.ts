import { NgModule } from '@angular/core';

import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemComponent } from './admin-item/admin-item.component';

@NgModule({
  declarations: [
    AdminItemsComponent,
    AdminItemComponent
  ],
  exports: [
    AdminItemsComponent,
    AdminItemComponent
  ]
})
export class AdminSharedModule {

}
