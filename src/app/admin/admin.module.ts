import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUtilityComponent } from './admin-utility/admin-utility.component';
import { AdminPaginationComponent } from './admin-utility/admin-pagination/admin-pagination.component';
import { AdminSearchComponent } from './admin-utility/admin-search/admin-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminUtilityComponent,
    AdminPaginationComponent,
    AdminSearchComponent
  ]
})
export class AdminModule { }
