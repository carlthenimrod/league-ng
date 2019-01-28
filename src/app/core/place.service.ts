import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import _ from 'lodash';

import { Place } from '@app/models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  api: string = environment.api;

  place: Place;
  placeSubject: Subject<Place> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  all() {
    const url = this.api + 'places';
    return this.http.get(url);
  }

  get(id: string) {
    const url = this.api + `places/${id}`;
    this.http.get(url).subscribe((place: Place) => {
      this.place = place;
      this.placeSubject.next(_.cloneDeep(place));
    });
  }

  placeListener(): Observable<Place> {
    return this.placeSubject.asObservable();
  }

  create(place: Place) {
    const url = this.api + 'places';
    return this.http.post(url, place);
  }

  update(place: Place) {
    const url = this.api + `places/${place._id}`;
    return this.http.put(url, place).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  delete(id: string) {
    const url = this.api + `places/${id}`;
    return this.http.delete(url);
  }
}
