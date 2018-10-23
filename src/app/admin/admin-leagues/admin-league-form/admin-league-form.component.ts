import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league-form',
  templateUrl: './admin-league-form.component.html',
  styleUrls: ['./admin-league-form.component.scss']
})
export class AdminLeagueFormComponent implements OnInit {

  @Input() league: League;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>;
  new: boolean;

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.league._id) {
      this.new = true;
    } else {
      this.new = false;
    }
  }

  onSubmit() {
    this.leagueService.save(this.league).subscribe(
      (league: League) => {
        this.league = league;

        if (this.new) {
          this.router.navigate(['admin', 'leagues', league._id]);
        } else {
          this.saveClick.emit(true);
        }
      }
    );
  }
}
