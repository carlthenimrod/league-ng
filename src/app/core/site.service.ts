import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import _ from 'lodash';

import { Site } from '@app/models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  api: string = environment.api;

  site: Site;
  siteSubject: Subject<Site> = new Subject<Site>();

  constructor(
    private http: HttpClient
  ) {}

  all(): Observable<any> {
    const url = this.api + 'sites';
    return this.http.get(url);
  }

  get(id: String): void {
    const url = this.api + `sites/${id}`;
    this.http.get(url).subscribe((site: Site) => {
      this.site = site;
      this.siteSubject.next(_.cloneDeep(this.site));
    });
  }

  siteListener(): Observable<Site> {
    return this.siteSubject.asObservable();
  }

  create(site: Site): Observable<any> {
    const url = this.api + 'sites';
    return this.http.post(url, site);
  }

  update(site: Site): Observable<any> {
    const url = this.api + `sites/${site._id}`;
    return this.http.put(url, site).pipe(
      tap((updatedsite: Site) => {
        this.site = updatedsite;
        this.siteSubject.next(_.cloneDeep(this.site));
      })
    );
  }

  delete(id: string): Observable<any> {
    const url = this.api + `sites/${id}`;
    return this.http.delete(url);
  }
}
