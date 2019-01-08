import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserFormComponent } from './register/user-form/user-form.component';
import { TeamFormComponent } from './register/team-form/team-form.component';
import { TypeSelectComponent } from './register/type-select/type-select.component';
import { TermsFormComponent } from './register/terms-form/terms-form.component';
import { MiscFormComponent } from './register/misc-form/misc-form.component';
import { ModalAddPlayerComponent } from './register/modal-add-player/modal-add-player.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    RegisterComponent,
    UserFormComponent,
    TeamFormComponent,
    TypeSelectComponent,
    TermsFormComponent,
    MiscFormComponent,
    ModalAddPlayerComponent,
    LoginComponent
  ],
  entryComponents: [
    ModalAddPlayerComponent
  ]
})
export class CoreModule { }
