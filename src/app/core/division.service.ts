import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { Division } from '@app/models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  api: string = environment.api;

  constructor(private http: HttpClient) { }

  save(leagueId: string, division: Division): Observable<any> {
    if (division._id) {
      const url = this.api + `leagues/${leagueId}/divisions/${division._id}`;
      return this.http.put(url, division);
    } else {
      const url = this.api + `leagues/${leagueId}/divisions`;
      return this.http.post(url, division);
    }
  }

  delete(leagueId: string, divisionId: string): Observable<any> {
    const url = this.api + `leagues/${leagueId}/divisions/${divisionId}`;
    return this.http.delete(url);
}
