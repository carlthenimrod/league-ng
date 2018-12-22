import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { slideNavTrigger, toggleNoticeTrigger } from './animations';
import { NoticeService } from '@app/core/notice.service';
import { NoticeList } from '@app/models/notice';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [slideNavTrigger, toggleNoticeTrigger]
})
export class AdminNavComponent implements OnInit, OnDestroy {
  notices: NoticeList;
  noticeSubscription: Subscription;
  streamSubscription: Subscription;
  menu = 'closed';

  constructor(
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    this.streamSubscription = this.noticeService.stream().subscribe();

    this.noticeSubscription = this.noticeService.noticesListener().subscribe((notices: NoticeList) => {
      this.notices = notices;
    });
  }

  onMenuClick() {
    if (this.menu === 'closed') {
      this.menu = 'open';
    } else {
      this.menu = 'closed';
    }
  }

  onCloseClick() {
    this.menu = 'closed';
  }

  ngOnDestroy() {
    this.streamSubscription.unsubscribe();
  }
}