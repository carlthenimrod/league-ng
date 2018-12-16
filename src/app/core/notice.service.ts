import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import _ from 'lodash';

import { NoticeList, NoticeResponse } from '@app/models/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  api = environment.api;

  notices: NoticeList = {
    notices: [],
    leagues: 0,
    teams: 0,
    users: 0,
    total: 0
  };
  noticesBehaviorSubject: BehaviorSubject<NoticeList> = new BehaviorSubject<NoticeList>(this.notices);

  constructor(private http: HttpClient) {}

  stream(): Observable<any> {
    const url = this.api + 'notices';
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(url)),
      map(this.formatNotices),
      tap((notices: NoticeList) => {
        this.notices = notices;
        this.noticesBehaviorSubject.next(_.cloneDeep(this.notices));
      })
    );
  }

  push() {
    const url = this.api + 'notices';
    this.http.get(url).pipe(map(this.formatNotices))
    .subscribe((notices: NoticeList) => {
      this.notices = notices;
      this.noticesBehaviorSubject.next(_.cloneDeep(this.notices));
    });
  }

  noticesListener() {
    return this.noticesBehaviorSubject.asObservable();
  }

  formatNotices(notices: NoticeResponse[]): NoticeList {
    const noticeList: NoticeList = {
      notices: [],
      leagues: 0,
      teams: 0,
      users: 0,
      total: 0
    };

    for (let i = 0; i < notices.length; i++) {
      const n = notices[i];

      switch (n.itemType) {
        case 'League':
          ++noticeList.leagues;
          break;

        case 'Team':
        ++noticeList.teams;
          break;

        case 'User':
        ++noticeList.users;
          break;
      }

      noticeList.notices.push({
        _id: n._id,
        item: n.item,
        type: n.itemType,
        message: n.notice,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt
      });

      ++noticeList.total;
    }

    return noticeList;
  }
}
