import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { League } from '@app/models/league';
import { Team } from '@app/models/team';
import { TeamService } from '@app/core/team.service';

@Component({
  selector: 'app-admin-modal-team',
  templateUrl: './admin-modal-team.component.html',
  styleUrls: ['./admin-modal-team.component.scss']
})
export class AdminModalTeamComponent implements OnInit {

  league: League;
  team: Team;
  autocompleteOptions: Team[];
  teamForm = this.fb.group({
    team: [this.team]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {league: League, team?: Team},
    public dialogRef: MatDialogRef<AdminModalTeamComponent>,
    public fb: FormBuilder,
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
      this.team = { name: selected };
    }

    this.dialogRef.close(this.team);
  }
}
