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
import { RegistrationCompleteComponent } from './register/registration-complete/registration-complete.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
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
    LoginComponent,
    RegistrationCompleteComponent,
    EmailConfirmComponent,
    LogoutComponent,
    PasswordRecoveryComponent
  ],
  entryComponents: [
    ModalAddPlayerComponent
  ]
})
export class CoreModule { }
