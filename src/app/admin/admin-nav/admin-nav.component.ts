import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { slideNavTrigger, toggleNoticeTrigger } from './animations';
import { NoticeService } from '@app/services/notice.service';
import { NoticeList } from '@app/models/notice';
import { ConfigService } from '@app/services/config.service';
import { Config } from '@app/models/config';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [slideNavTrigger, toggleNoticeTrigger]
})
export class AdminNavComponent implements OnInit, OnDestroy {
  config: Config;
  notices: NoticeList;
  noticeSubscription: Subscription;
  streamSubscription: Subscription;
  menu = 'closed';

  constructor(
    private configService: ConfigService,
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    this.streamSubscription = this.noticeService.stream().subscribe();

    this.noticeSubscription = this.noticeService.noticesListener().subscribe((notices: NoticeList) => {
      this.notices = notices;
    });

    this.configService.configListener().subscribe((config: Config) => this.config = config);
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
