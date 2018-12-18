import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs';

import { NoticeList, Notice } from '@app/models/notice';
import { NoticeService } from '@app/core/notice.service';
import { noticeListEnterTrigger, noticeToggleTrigger, noNoticesToggleTrigger } from './animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [noticeListEnterTrigger, noticeToggleTrigger, noNoticesToggleTrigger]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  noticeList: NoticeList;
  notices: Notice[];
  noticeSubscription: Subscription;
  noNoticesState;

  constructor(
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    this.noticeService.push();

    this.noticeSubscription = this.noticeService.noticesListener().subscribe((noticeList: NoticeList) => {
      this.noticeList = noticeList;
    });
  }

  ngOnDestroy() {
    this.noticeSubscription.unsubscribe();
  }

  onClickDeleteNotice($event: Event, notice: Notice) {
    $event.preventDefault();
    $event.stopPropagation();

    this.noticeService.delete(notice._id, notice.type);
  }

  onClickDeleteNotices() {
    if (confirm('Are you sure you want to hide all notices?')) {
      this.noticeService.deleteAll();
    }
  }

  onSwipeDeleteNotice(notice: Notice) {
    this.noticeService.delete(notice._id, notice.type);
  }

  onAnimationStart($event: AnimationEvent) {
    if ($event.toState === 'void') {
      this.noNoticesState = 'hide';
    }
  }

  onAnimationEnd($event: AnimationEvent) {
    if ($event.toState === 'void') {
      this.noNoticesState = 'show';
    }
  }

  trackById(index: number, notice: Notice) {
    return notice._id;
  }
}
