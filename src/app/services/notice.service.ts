import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, timer, Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as _ from 'lodash';

import { NoticeList, NoticeResponse, Notice } from '@app/models/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  api = environment.api;

  noticeList: NoticeList = {
    notices: [],
    leagues: 0,
    teams: 0,
    users: 0,
    total: 0
  };
  noticesSubject: Subject<NoticeList> = new Subject<NoticeList>();

  constructor(private http: HttpClient) {}

  stream(): Observable<any> {
    const url = this.api + 'notices';
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(url)),
      map(this.formatNotices),
      tap((noticeList: NoticeList) => {
        this.noticeList = noticeList;
        this.noticesSubject.next(_.cloneDeep(this.noticeList));
      })
    );
  }

  push() {
    const url = this.api + 'notices';
    this.http.get(url).pipe(map(this.formatNotices))
    .subscribe((noticeList: NoticeList) => {
      this.noticeList = noticeList;
      this.noticesSubject.next(_.cloneDeep(this.noticeList));
    });
  }

  noticesListener() {
    return this.noticesSubject.asObservable();
  }

  delete(id: string, type: string) {
    const url = this.api + `notices/${id}`;
    this.http.delete(url).subscribe(() => {
      const i = this.noticeList.notices.findIndex((n: Notice) => n._id === id);

      this.noticeList.notices.splice(i, 1);
      --this.noticeList.total;

      switch (type) {
        case 'League':
          --this.noticeList.leagues;
          break;

        case 'Team':
          --this.noticeList.teams;
          break;

        case 'User':
          --this.noticeList.users;
          break;
      }

      this.noticesSubject.next(_.cloneDeep(this.noticeList));
    });
  }

  deleteAll() {
    const requests = [];

    // create request for each notice
    this.noticeList.notices.forEach((notice: Notice) => {
      const url = this.api + `notices/${notice._id}`;
      requests.push(this.http.delete(url));
    });

    forkJoin(requests).subscribe(() => {
      // empty notice list
      this.noticeList = {
        notices: [],
        leagues: 0,
        teams: 0,
        users: 0,
        total: 0
      };

      this.noticesSubject.next(_.cloneDeep(this.noticeList));
    });
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

      let message;

      switch (n.notice) {
        case 'new':
          const name = (n.itemType === 'User') ? n.item.fullName : n.item.name;
          message = `New ${n.itemType}: ${name} has recently been created.`;
          break;
      }

      noticeList.notices.push({
        message,
        _id: n._id,
        item: n.item,
        type: n.itemType,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt
      });

      ++noticeList.total;
    }

    return noticeList;
  }
}
