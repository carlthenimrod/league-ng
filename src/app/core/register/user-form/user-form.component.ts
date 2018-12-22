import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter();
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Input() form: FormGroup;
  userForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.userForm = <FormGroup>this.form.controls.userForm;
  }

  onClickBack() {
    this.step.emit('back');
  }

  onSubmit() {
    if (this.userForm.invalid) { return; }
    this.step.emit('next');
  }
}
