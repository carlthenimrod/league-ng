import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { confirmPassword } from '@app/validators/password-confirm.validator';
import { UserService } from '../user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.touched && form.control.hasError('notSame') || (isSubmitted && form.control.hasError('notSame')));
  }
}

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirm: ['', Validators.required]
  }, { validator: confirmPassword });
  confirmEmail: boolean;
  userId: string;
  code: string;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.code = this.route.snapshot.queryParams.code;

    this.userService.confirmEmail(this.userId, this.code).subscribe(() => {
      this.confirmEmail = true;
    }, () => {
      this.router.navigateByUrl('user');
    });
  }

  onSubmit() {
    if (this.passwordForm.invalid) { return; }

    const {password, confirm} = this.passwordForm.value;

    if (password === confirm) {
      this.userService.createPassword(this.userId, this.code, password).subscribe(() => {
        this.router.navigateByUrl('user');
      });
    }
  }
}
