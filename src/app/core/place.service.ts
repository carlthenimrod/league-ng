import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import _ from 'lodash';

import { Place, PlaceLocation, Permit } from '@app/models/place';

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

  addLocation(location: PlaceLocation) {
    const url = this.api + `places/${this.place._id}/locations`;
    return this.http.post(url, location).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  updateLocation(location: PlaceLocation) {
    const url = this.api + `places/${this.place._id}/locations/${location._id}`;
    return this.http.put(url, location).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  deleteLocation(locationId: string) {
    const url = this.api + `places/${this.place._id}/locations/${locationId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        const index = this.place.locations.findIndex((l: PlaceLocation) => l._id === locationId);
        this.place.locations.splice(index, 1);
        this.placeSubject.next(_.cloneDeep(this.place));
      })
    );
  }

  addPermit(permit: Permit) {
    const url = this.api + `places/${this.place._id}/permits`;
    return this.http.post(url, permit).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  updatePermit(permit: Permit) {
    const url = this.api + `places/${this.place._id}/permits/${permit._id}`;
    return this.http.put(url, permit).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  deletePermit(permitId: string) {
    const url = this.api + `places/${this.place._id}/permits/${permitId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        const index = this.place.permits.findIndex((p: Permit) => p._id === permitId);
        this.place.permits.splice(index, 1);
        this.placeSubject.next(_.cloneDeep(this.place));
      })
    );
  }
}
