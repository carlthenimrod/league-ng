import { Component, OnInit, Input } from '@angular/core';

import { Permit } from '@app/models/place';

@Component({
  selector: 'app-admin-permits',
  templateUrl: './admin-permits.component.html',
  styleUrls: ['./admin-permits.component.scss']
})
export class AdminPermitsComponent implements OnInit {
  @Input() permits: Permit[];

  constructor() { }

  ngOnInit() {
  }

}
