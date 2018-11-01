import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { League } from '@app/models/league';
import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-league-team-form',
  templateUrl: './admin-league-team-form.component.html',
  styleUrls: ['./admin-league-team-form.component.scss']
})
export class AdminLeagueTeamFormComponent implements OnInit {

  league: League;
  team: Team;
  autocompleteOptions: Team[];
  new = false;
  teamForm = this.fb.group({
    team: [this.team]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, team?: Team},
    public dialogRef: MatDialogRef<AdminLeagueTeamFormComponent>,
    public fb: FormBuilder,
    public teamService: TeamService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

    if (this.data.team) {
      this.team = this.data.team;
    } else {
      this.new = true;
      this.team = new Team('');
    }

    this.teamService.all().subscribe((teams: Team[]) => {
      this.autocompleteOptions = teams.filter((t: Team) => {
        const result = this.league.teams.find((l: Team) => l._id === t._id);
        if (!result) { return t; }
      });
    });
  }

  displayFn(team: Team): string | undefined {
    return team ? team.name : undefined;
  }

  onSubmit() {
    const selected = this.teamForm.controls.team.value;

    if (typeof selected === 'object') { // existing
      this.team = selected;
    } else { // new
      this.team = new Team(selected);
    }

    this.teamService.save(this.team, this.league._id)
    .subscribe((team: Team) => {
      this.dialogRef.close(team);
    });
  }
}
