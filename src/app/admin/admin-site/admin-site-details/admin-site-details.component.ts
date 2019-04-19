import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Site } from '@app/models/site';
import { SiteService } from '@app/services/site.service';

@Component({
  selector: 'app-admin-site-details',
  templateUrl: './admin-site-details.component.html',
  styleUrls: ['./admin-site-details.component.scss']
})
export class AdminSiteDetailsComponent implements OnInit {
  @Input() site: Site;
  @Output('editClick') editClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public siteService: SiteService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.emit(true);
  }

  onDeleteClick() {
    const label = prompt('Warning: Cannot be undone! Enter site\'s label to confirm:');

    if (!label) { return; }

    if (this.site.label === label.trim()) {
      this.siteService.delete(this.site._id).subscribe(() => {
        this.router.navigate(['/', 'admin', 'sites']);
      });
    } else {
      alert('Error: Site label entered doesn\'t match.');
    }
  }
}
