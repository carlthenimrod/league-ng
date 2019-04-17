import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import _ from 'lodash';

import { Config } from '@app/models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  api: string = environment.api;

  config: Config;
  configSubject: BehaviorSubject<Config>;

  constructor(private http: HttpClient) {
    this.configSubject = new BehaviorSubject(_.cloneDeep(this.config));
  }

  get(): void {
    const url = this.api + `config`;
    this.http.get(url).subscribe((config: Config) => {
      this.config = config;
      this.configSubject.next(_.cloneDeep(this.config));
    });
  }

  configListener(): Observable<Config> {
    return this.configSubject.asObservable();
  }

  save(config: Config): Observable<any> {
    const url = this.api + `config`;
    return this.http.post(url, config).pipe(
      tap((updatedConfig: Config) => {
        this.config = updatedConfig;
        this.configSubject.next(_.cloneDeep(this.config));
      })
    );
  }
}
