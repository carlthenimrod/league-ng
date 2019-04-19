import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';

@Component({
  selector: 'app-admin-team-details',
  templateUrl: './admin-team-details.component.html',
  styleUrls: ['./admin-team-details.component.scss']
})
export class AdminTeamDetailsComponent implements OnInit {

  @Input() team: Team;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public teamService: TeamService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    const name = prompt('Warning: Cannot be undone! Enter league name to confirm:');

    if (!name) { return; }

    if (this.team.name === name.trim()) {
      this.teamService.delete(this.team._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'teams']);
      });
    } else {
      alert('Error: Team name entered doesn\'t match.');
    }
  }
}
