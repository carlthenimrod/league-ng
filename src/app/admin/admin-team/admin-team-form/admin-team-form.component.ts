import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-team-form',
  templateUrl: './admin-team-form.component.html',
  styleUrls: ['./admin-team-form.component.scss']
})
export class AdminTeamFormComponent implements OnInit {
  @Input() team: Team;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.team) {
      this.teamForm.patchValue(this.team);
    }
  }

  onSubmit() {
    if (!this.teamForm.valid) { return; }

    if (this.team) {
      const team: Team = {
        _id: this.team._id,
        ...this.teamForm.value
      };

      this.teamService.update(team).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      const team: Team = {...this.teamForm.value};

      this.teamService.create(team).subscribe((createdTeam: Team) => {
        this.router.navigate(['admin', 'teams', createdTeam._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
