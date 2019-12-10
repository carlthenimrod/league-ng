import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { emailUnique } from '@app/validators/email-unique.validator';
import {
  typeSelectTrigger,
  userFormTrigger,
  miscFormTrigger,
  teamFormTrigger,
  termsFormTrigger,
  completeTrigger } from './animations';
import { TemplateService } from '@app/services/template.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    typeSelectTrigger,
    userFormTrigger,
    miscFormTrigger,
    teamFormTrigger,
    termsFormTrigger,
    completeTrigger
  ]
})
export class RegisterComponent {
  state = 'type';
  type: string;

  regsiterForm = this.fb.group({
    userForm: this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.email, emailUnique(this.userService)],
      phone: ['', Validators.required],
      secondary: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postal: ['', Validators.required]
      })
    }),
    miscForm: this.fb.group({
      emergency: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required],
        phone: ['', Validators.required],
        secondary: ['']
      }),
      comments: ['']
    })
  });

  constructor(
    private fb: FormBuilder,
    private templateService: TemplateService,
    private userService: UserService
  ) { }

  onTypeSelect(type: string) {
    if (type === 'team') {
      this.regsiterForm.addControl('teamForm', this.fb.group({
        name: ['', Validators.required],
        roster: this.fb.array([])
      }));
    } else {
      this.regsiterForm.removeControl('teamForm');
    }

    this.type = type;
    this.state = 'user';
  }

  onStepChange(step: string) {
    this.templateService.scrollCtnUp();

    if (step === 'back') {
      this.stepBack();
    } else if (step === 'next') {
      this.stepNext();
    }

    window.scrollTo(0, 0);
  }

  stepBack() {
    switch (this.state) {
      case 'user':
        this.state = 'type';
        break;
      case 'misc':
        this.state = 'user';
        break;
      case 'team':
        this.state = 'misc';
        break;
      case 'terms':
        this.state = (this.type === 'team') ? 'team' : 'misc';
        break;
    }
  }

  stepNext() {
    switch (this.state) {
      case 'type':
        this.state = 'user';
        break;
      case 'user':
        this.state = 'misc';
        break;
      case 'misc':
        this.state = (this.type === 'team') ? 'team' : 'terms';
        break;
      case 'team':
        this.state = 'terms';
        break;
    }
  }

  onTermsAccept(accepted: boolean) {
    if (accepted && this.regsiterForm.valid) {
      const form = this.regsiterForm.value;

      const user: User = {
        name: {
          first: form.userForm.first,
          last: form.userForm.last
        },
        email: form.userForm.email,
        address: form.userForm.address,
        phone: form.userForm.phone,
        secondary: form.userForm.secondary,
        emergency: {
          name: {
            first: form.miscForm.emergency.first,
            last: form.miscForm.emergency.last
          },
          phone: form.miscForm.emergency.phone,
          secondary: form.miscForm.emergency.secondary
        },
        comments: form.miscForm.comments
      };

      this.userService.post$(user).subscribe(() => {
        this.state = 'complete';
      });
    }
  }
}
