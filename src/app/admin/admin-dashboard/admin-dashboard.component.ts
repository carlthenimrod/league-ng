import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NoticeList, Notice } from '@app/models/notice';
import { NoticeService } from '@app/core/notice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  noticeList: NoticeList;
  notices: Notice[];
  noticeSubscription: Subscription;

  constructor(
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    this.noticeSubscription = this.noticeService.noticesListener().subscribe((notices: NoticeList) => {
      this.noticeList = notices;
    });
  }

  ngOnDestroy() {
    this.noticeSubscription.unsubscribe();
  }
}
