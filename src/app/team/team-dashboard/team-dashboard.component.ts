import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '@app/models/team';
import { TeamService } from '@app/services/team.service';
import { ProfileImg } from '@app/models/profile-img';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit {
  team: Team;
  tab = 'feed';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.teamListener().subscribe((team: Team) => this.team = team);

    this.route.data.subscribe((data: {team: Team}) => {
      this.team = data.team;
    });
  }

  onSaveImg(data: { file: File, img: ProfileImg }) {
    const {file, img} = data;

    // this.teamService.updateImg(file, img).subscribe();
  }
}
