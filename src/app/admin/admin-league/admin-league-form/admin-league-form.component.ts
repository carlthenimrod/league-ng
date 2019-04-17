import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { League } from '@app/models/league';
import { LeagueService } from '@app/core/league.service';
import { ConfigService } from '@app/core/config.service';
import { Config } from '@app/models/config';
import { SiteService } from '@app/core/site.service';
import { Site } from '@app/models/site';

@Component({
  selector: 'app-admin-league-form',
  templateUrl: './admin-league-form.component.html',
  styleUrls: ['./admin-league-form.component.scss']
})
export class AdminLeagueFormComponent implements OnInit {
  @Input() league: League;
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  leagueForm: FormGroup;
  config: Config;
  sites: Site[];

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private router: Router,
    private siteService: SiteService
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

    this.configService.configListener().subscribe((config: Config) => {
      this.config = config;

      if (this.config.multi) {
        this.siteService.all().subscribe((sites: Site[]) => this.sites = sites);

        if (this.league) {
          const siteIds = this.league.sites.map(site => site._id);
          this.leagueForm.addControl('sites', this.fb.control(siteIds));
        } else {
          this.leagueForm.addControl('sites', this.fb.control(''));
        }
      }
    });
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
