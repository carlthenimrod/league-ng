import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';

@Component({
  selector: 'app-admin-league-form',
  templateUrl: './admin-league-form.component.html',
  styleUrls: ['./admin-league-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLeagueFormComponent implements OnInit, OnChanges {

  @Input() league: League;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  leagueCopy: League;
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

    // create copy
    this.leagueCopy = _.cloneDeep(this.league);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.league && !changes.league.firstChange) {
      const updatedLeague = changes.league.currentValue;

      // keep old name and description if form is open
      updatedLeague.name = this.leagueCopy.name;
      updatedLeague.description = this.leagueCopy.description;

      // update our copy
      this.leagueCopy = updatedLeague;
    }
  }

  onSubmit() {
    this.leagueService.save(this.leagueCopy).subscribe((league: League) => {
        if (this.new) {
          this.router.navigate(['admin', 'leagues', league._id]);
        } else {
          this.saveClick.emit(true);
        }
      }
    );
  }

  onCancel() {
    this.cancelClick.emit(true);
  }
}
