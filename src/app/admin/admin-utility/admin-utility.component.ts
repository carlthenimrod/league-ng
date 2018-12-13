import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { League } from '@app/models/league';
import { Team } from '@app/models/team';
import { User } from '@app/models/user';

@Component({
  selector: 'app-admin-utility',
  templateUrl: './admin-utility.component.html',
  styleUrls: ['./admin-utility.component.scss']
})
export class AdminUtilityComponent implements OnInit {

  @Input() leagues: League[];
  @Input() teams: Team[];
  @Input() users: User[];
  @Output() results: EventEmitter<League[]|Team[]|User[]> = new EventEmitter();

  currentPage = 0;
  perPage = 10;
  label = 'Items';
  matched: League[]|Team[]|User[];
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
    } else if (this.users) {
      this.utilityForm.addControl('roles', new FormControl());
      this.label = 'Users';
      this.matched = this.users;
    }
  }

  onSearch() {
    if (this.teams) {
      this.searchTeams();
    } else if (this.users) {
      this.searchUsers();
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

  searchUsers() {
    const {name, role}: {name: string, role: string} = this.utilityForm.value;

    this.matched = this.users.filter((user: User) => {

      // check if name matches
      if (name && user.name.substr(0, name.length).toUpperCase() !== name.toUpperCase()) {
        return false;
      }

      return user;
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
