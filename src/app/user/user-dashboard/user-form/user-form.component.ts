import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm = this.fb.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    phone: ['', Validators.required],
    secondary: [''],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal: ['', Validators.required]
    }),
    emergency: this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      phone: ['', Validators.required],
      secondary: ['']
    })
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onCancel() {

  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
