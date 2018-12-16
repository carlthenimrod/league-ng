import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';

import { noticeToggleTrigger } from './animations';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  animations: [noticeToggleTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit, OnChanges {

  @Input() total: number;
  label: number | string;

  constructor() { }

  ngOnInit() {
    this.updateLabel();
  }

  ngOnChanges() {
    this.updateLabel();
  }

  updateLabel() {
    if (this.total < 100) {
      this.label = this.total;
    } else {
      this.label = '99+';
    }
  }
}
