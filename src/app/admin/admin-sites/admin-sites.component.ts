import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SiteService } from '@app/core/site.service';
import { Site } from '@app/models/site';
import { ConfigService } from '@app/core/config.service';
import { Config } from '@app/models/config';

@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.scss']
})
export class AdminSitesComponent implements OnInit {
  sites: Site[];

  constructor(
    private configService: ConfigService,
    private router: Router,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.configService.configListener().subscribe((config: Config) => {
      if (config.multi) {
        this.siteService.all().subscribe((sites: Site[]) => this.sites = sites);
      } else {
        this.router.navigate(['admin']);
      }
    });
  }
}
