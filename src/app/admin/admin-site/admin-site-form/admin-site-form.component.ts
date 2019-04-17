import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Site } from '@app/models/site';
import { SiteService } from '@app/core/site.service';

@Component({
  selector: 'app-admin-site-form',
  templateUrl: './admin-site-form.component.html',
  styleUrls: ['./admin-site-form.component.scss']
})
export class AdminSiteFormComponent implements OnInit {
  @Output('saveClick') saveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('cancelClick') cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() site: Site;
  siteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private siteService: SiteService
  ) { }

  ngOnInit() {
    this.siteForm = this.fb.group({
      label: ['', Validators.required],
      url: ['']
    });

    if (this.site) {
      this.siteForm.patchValue(this.site);
    }
  }

  onSubmit() {
    if (!this.siteForm.valid) { return; }

    if (this.site) {
      const site: Site = {
        _id: this.site._id,
        ...this.siteForm.value
      };

      this.siteService.update(site).subscribe(() => {
        this.saveClick.emit(true);
      });
    } else {
      const site: Site = {...this.siteForm.value};

      this.siteService.create(site).subscribe((createdSite: Site) => {
        this.router.navigate(['admin', 'sites', createdSite._id]);
      });
    }
  }

  onCancel() {
    this.cancelClick.emit(false);
  }
}
