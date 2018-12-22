import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {
  typeSelectTrigger,
  userFormTrigger,
  miscFormTrigger,
  teamFormTrigger,
  termsFormTrigger} from './animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    typeSelectTrigger,
    userFormTrigger,
    miscFormTrigger,
    teamFormTrigger,
    termsFormTrigger
  ]
})
export class RegisterComponent implements OnInit {
  state = 'type';
  type: string;

  regsiterForm = this.fb.group({
    userForm: this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.email],
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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

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
    if (step === 'back') {
      this.stepBack();
    } else if (step === 'next') {
      this.stepNext();
    }
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
    if (accepted) {
      console.log('Accepted!');
    }
  }
}
