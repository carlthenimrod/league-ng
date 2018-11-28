import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { League } from '@app/models/league';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-admin-utility',
  templateUrl: './admin-utility.component.html',
  styleUrls: ['./admin-utility.component.scss']
})
export class AdminUtilityComponent implements OnInit {

  @Input() teams: Team[];
  @Input() leagues: League[];
  @Output() results: EventEmitter<League[]|Team[]> = new EventEmitter();

  currentPage = 0;
  perPage = 10;
  label = 'Items';
  matched: League[]|Team[];
  utilityForm = this.fb.group({ name: [''] });

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.teams) {
      this.utilityForm.addControl('status', new FormControl());
      this.label = 'Teams';
      this.matched = this.teams;

      this.paginateAndEmit();
    }
  }

  onSearch() {
    if (this.teams) {
      this.searchTeams();
    }
  }

  onPerPageChange($event) {
    this.currentPage = 0;
    this.perPage = $event;

    this.paginateAndEmit();
  }

  onPageChange($event) {
    this.currentPage = $event;

    this.paginateAndEmit();
  }

  searchTeams() {
    const {name, status}: {name: string, status: string} = this.utilityForm.value;

    this.matched = this.teams.filter((team: Team) => {

      // check if name matches
      if (name && team.name.substr(0, name.length).toUpperCase() !== name.toUpperCase()) {
        return false;
      }

      if (status && team.status !== status) {
        return false;
      }

      return team;
    });

    this.currentPage = 0;
    this.paginateAndEmit();
  }

  paginateAndEmit() {
    const paginated = this.matched.slice(
      this.currentPage * this.perPage,
      (this.currentPage + 1) * this.perPage
    );

    this.results.emit(paginated);
  }
}
