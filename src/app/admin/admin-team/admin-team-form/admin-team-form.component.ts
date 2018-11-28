import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  oldTeam: Team;
  new: boolean;

  constructor(
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.team._id) {
      this.new = true;
    } else {
      this.new = false;
    }

    // create copy
    this.oldTeam = {...this.team};
  }

  onSubmit() {
    this.teamService.save(this.team).subscribe(
      (team: Team) => {
        this.team = team;

        if (this.new) {
          this.router.navigate(['admin', 'teams', team._id]);
        } else {
          this.saveClick.emit(true);
        }
      }
    );
  }

  onCancel() {
    // reset values to old team
    this.team.name = this.oldTeam.name;

    this.cancelClick.emit(true);
  }
}
