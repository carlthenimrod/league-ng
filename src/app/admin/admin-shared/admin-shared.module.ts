import { NgModule } from '@angular/core';

import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemComponent } from './admin-item/admin-item.component';
import { AdminItemHeaderComponent } from './admin-item/admin-item-header/admin-item-header.component';
import { AdminItemSettingsComponent } from './admin-item/admin-item-settings/admin-item-settings.component';
import { AdminItemSectionComponent } from './admin-item/admin-item-section/admin-item-section.component';

@NgModule({
  declarations: [
    AdminItemsComponent,
    AdminItemComponent,
    AdminItemHeaderComponent,
    AdminItemSettingsComponent,
    AdminItemSectionComponent
  ],
  exports: [
    AdminItemsComponent,
    AdminItemComponent,
    AdminItemHeaderComponent,
    AdminItemSettingsComponent,
    AdminItemSectionComponent
  ]
})
export class AdminSharedModule {

}
