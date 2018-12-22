import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-misc-form',
  templateUrl: './misc-form.component.html',
  styleUrls: ['./misc-form.component.scss']
})
export class MiscFormComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter();
  @Input() form: FormGroup;
  miscForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.miscForm = <FormGroup>this.form.controls.miscForm;
  }

  onClickBack() {
    this.step.emit('back');
  }

  onSubmit() {
    if (this.miscForm.invalid) { return; }
    this.step.emit('next');
  }
}
