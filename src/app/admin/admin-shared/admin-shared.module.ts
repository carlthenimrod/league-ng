import { NgModule } from '@angular/core';

import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { AdminItemHeaderComponent } from './admin-item-header/admin-item-header.component';
import { AdminItemSettingsComponent } from './admin-item-settings/admin-item-settings.component';

@NgModule({
  declarations: [
    AdminItemsComponent,
    AdminItemComponent,
    AdminItemHeaderComponent,
    AdminItemSettingsComponent
  ],
  exports: [
    AdminItemsComponent,
    AdminItemComponent,
    AdminItemHeaderComponent,
    AdminItemSettingsComponent
  ]
})
export class AdminSharedModule {

}
