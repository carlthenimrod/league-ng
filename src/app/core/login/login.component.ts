import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(
  ) {}

  onClickRecover() {

  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }

    const {email, password} = this.loginForm.value;

    this.auth.login(email, password);
  }
}
