import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '@app/models/league';

@Component({
  selector: 'app-team-league-selector',
  templateUrl: './team-league-selector.component.html',
  styleUrls: ['./team-league-selector.component.scss']
})
export class TeamLeagueSelectorComponent implements OnInit {
  @Input() leagues: League[];
  @Output() leagueSelected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  displayLeagueName(league?: League): string | undefined {
    return league ? league.name : undefined;
  }
}
