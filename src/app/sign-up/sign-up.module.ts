import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpTypeComponent } from './sign-up-type/sign-up-type.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { SignUpMiscComponent } from './sign-up-misc/sign-up-misc.component';
import { SignUpTeamComponent } from './sign-up-team/sign-up-team.component';
import { SignUpTermsComponent } from './sign-up-terms/sign-up-terms.component';
import { SignUpCompleteComponent } from './sign-up-complete/sign-up-complete.component';
import { SignUpHeaderComponent } from './sign-up-header/sign-up-header.component';
import { SignUpSectionComponent } from './sign-up-section/sign-up-section.component';
import { SignUpActionsComponent } from './sign-up-actions/sign-up-actions.component';
import { SignUpSearchComponent } from './sign-up-team/sign-up-search/sign-up-search.component';
import { SignUpModalComponent } from './sign-up-team/sign-up-modal/sign-up-modal.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignUpTypeComponent,
    SignUpUserComponent,
    SignUpMiscComponent,
    SignUpTeamComponent,
    SignUpTermsComponent,
    SignUpCompleteComponent,
    SignUpHeaderComponent,
    SignUpSectionComponent,
    SignUpActionsComponent,
    SignUpSearchComponent,
    SignUpModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SignUpRoutingModule
  ],
  entryComponents: [
    SignUpModalComponent
  ]
})
export class SignUpModule { }
