import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Site } from '@app/models/site';
import { SiteService } from '@app/core/site.service';

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
    private route: ActivatedRoute,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.siteSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.siteService.get(params.get('id'));
        return this.siteService.siteListener();
      })
    )
    .subscribe((site: Site) => this.site = site);
  }

  ngOnDestroy() {
    this.siteSubscription.unsubscribe();
  }
}
