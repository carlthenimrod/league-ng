import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/services/league.service';

@Component({
  selector: 'app-admin-league-form',
  templateUrl: './admin-league-form.component.html',
  styleUrls: ['./admin-league-form.component.scss']
})
export class AdminLeagueFormComponent implements OnInit {
  @Input() league: League;
  @Output() saveClick = new EventEmitter<boolean>();
  @Output() cancelClick = new EventEmitter<boolean>();
  leagueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.league) {
      this.leagueForm = this.fb.group({
        name: [this.league.name, Validators.required],
        description: [this.league.description]
      });
    } else {
      this.leagueForm = this.fb.group({
        name: ['', Validators.required],
        description: ['']
      });
    }
  }

  onSubmit() {
    if (!this.leagueForm.valid) { return; }

    if (this.league) {
      const league: League = {
        _id: this.league._id,
        ...this.leagueForm.value
      };

      this.leagueService.update(league).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      const league: League = {...this.leagueForm.value};

      this.leagueService.create(league).subscribe((createdLeague: League) => {
        this.router.navigate(['admin', 'leagues', createdLeague._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
