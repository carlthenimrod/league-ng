import { Component, Input } from '@angular/core';

import { Place } from '@app/models/place';

@Component({
  selector: 'app-admin-place-header',
  templateUrl: './admin-place-header.component.html',
  styleUrls: ['./admin-place-header.component.scss']
})
export class AdminPlaceHeaderComponent {
  @Input() place: Place;

  constructor() { }
}
