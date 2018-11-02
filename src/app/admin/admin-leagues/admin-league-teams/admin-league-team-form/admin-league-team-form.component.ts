import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
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
  teamForm = this.fb.group({
    team: [this.team]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, team?: Team},
    public dialogRef: MatDialogRef<AdminLeagueTeamFormComponent>,
    public fb: FormBuilder,
    public leagueService: LeagueService,
    public teamService: TeamService
  ) { }

  ngOnInit() {
    this.league = this.data.league;

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

    this.leagueService.addTeam(this.league._id, this.team)
    .subscribe((team: Team) => {
      this.dialogRef.close(team);
    });
  }
}
