import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Site } from '@app/models/site';
import { SiteService } from '@app/core/site.service';
import { ConfigService } from '@app/core/config.service';
import { Config } from '@app/models/config';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.scss']
})
export class AdminSiteComponent implements OnInit, OnDestroy {
  site: Site;
  siteSubscription: Subscription;
  editingSite = false;

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.configService.configListener().subscribe((config: Config) => {
      if (config.multi) {
        this.siteSubscription = this.route.paramMap.pipe(
          switchMap((params: ParamMap) => {
            this.siteService.get(params.get('id'));
            return this.siteService.siteListener();
          })
        )
        .subscribe((site: Site) => this.site = site);
      } else {
        this.router.navigate(['admin']);
      }
    });
  }

  ngOnDestroy() {
    if (this.siteSubscription) {this.siteSubscription.unsubscribe(); }
  }
}
