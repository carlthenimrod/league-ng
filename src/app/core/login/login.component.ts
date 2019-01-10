import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loggedIn = true;
  error: boolean|string = false;
  errorMsg: string;
  messageTimeout;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigateByUrl('user');
    } else {
      this.loggedIn = false;
    }
  }

  onClickRecover() {

  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }

    const {email, password} = this.loginForm.value;

    this.auth.login(email, password).subscribe(() => {
      this.router.navigateByUrl('user');
    }, (e: Error) => {
      this.error = true;
      this.errorMsg = e.message;
      clearTimeout(this.messageTimeout);

      this.messageTimeout = setTimeout(() => {
        this.error = false;
      }, 5000);
    });
  }
}
