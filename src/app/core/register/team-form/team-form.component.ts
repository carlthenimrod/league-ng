import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ModalAddPlayerComponent } from '../modal-add-player/modal-add-player.component';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  @Output() step: EventEmitter<string> = new EventEmitter();
  @Input() form: FormGroup;
  teamForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.teamForm = <FormGroup>this.form.controls.teamForm;
  }

  onClickBack() {
    this.step.emit('back');
  }

  onSubmit() {
    if (this.teamForm.invalid) { return; }
    this.step.emit('next');
  }

  onClickAddPlayer() {
    const dialogRef = this.dialog.open(ModalAddPlayerComponent, {
      autoFocus: false,
      restoreFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (!user) { return; }

      const roster = <FormArray>this.teamForm.get('roster');
      roster.push(this.fb.group({
        name: [user.name],
        email: [user.email],
        roles: [user.roles]
      }));
    });
  }

  onClickRemovePlayer(index: number) {
    const roster = <FormArray>this.teamForm.get('roster');
    roster.removeAt(index);
  }
}
