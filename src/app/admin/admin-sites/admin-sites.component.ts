import { Component, OnInit } from '@angular/core';

import { SiteService } from '@app/core/site.service';
import { Site } from '@app/models/site';

@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.scss']
})
export class AdminSitesComponent implements OnInit {
  sites: Site[];

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.all().subscribe((sites: Site[]) => this.sites = sites);
  }
}
