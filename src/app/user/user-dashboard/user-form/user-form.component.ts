import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user: User;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      phone: ['', Validators.required],
      secondary: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postal: ['', Validators.required]
      }),
      emergency: this.fb.group({
        name: this.fb.group({
          first: ['', Validators.required],
          last: ['', Validators.required]
        }),
        phone: ['', Validators.required],
        secondary: ['']
      })
    });

    this.userForm.patchValue(this.user);
  }

  onCancel() {
    this.save.emit(false);
  }

  onSubmit() {
    if (!this.userForm.valid) { return; }

    const user: User = {
      _id: this.user._id,
      ...this.userForm.value
    };

    this.userService.put$(user).subscribe(() => {
      this.save.emit(true);
    });
  }
}
