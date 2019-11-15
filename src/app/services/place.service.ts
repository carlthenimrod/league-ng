import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Place, Permit, Slot, Location } from '@app/models/place';
import { Game } from '@app/models/game';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  api = environment.api;
  place: Place;
  placeSubject = new BehaviorSubject<Place>(null);
  place$ = this.placeSubject.asObservable();

  constructor(private http: HttpClient) { }

  get$(): Observable<Place[]>;
  get$(id: string): Observable<Place>;
  get$(id?: string): Observable<Place> | Observable<Place[]> {
    const url = this.api + `places${ id ? `/${id}` : ``}`;

    return id
    ? this.http.get<Place>(url)
        .pipe<Place>(
          tap(place => {
            this.place = place;
            this.placeSubject.next(_.cloneDeep(this.place));
          })
        )
    : this.http.get<Place[]>(url);
  }

  post$(place: Place): Observable<Place> {
    const url = `${this.api}places`;

    return this.http.post<Place>(url, place)
      .pipe(
        tap(newPlace => {
          this.place = newPlace;
          this.placeSubject.next(_.cloneDeep(newPlace));
        })
      );
  }

  put$(values: { [key: string]: any }): Observable<Place> {
    const url = `${this.api}places/${this.place._id}`;

    return this.http.put<Place>(url, { ...this.place, ...values })
      .pipe(
        tap(place => {
          this.place = place;
          this.placeSubject.next(_.cloneDeep(this.place));
        })
      );
  }

  delete$() {
    const url = `${this.api}places/${this.place._id}`;
    return this.http.delete<void>(url)
      .pipe(
        tap(() => {
          this.place = null;
          this.placeSubject.next(null);
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

  clearPermitSlots(permitId: string) {
    const url = this.api + `places/${this.place._id}/permits/${permitId}`;
    const i = this.place.permits.findIndex((p: Permit) => p._id === permitId);
    const permit = this.place.permits[i];
    permit.slots.length = 0;

    return this.http.put(url, permit).pipe(
      tap((updatedPlace: Place) => {
        this.place = updatedPlace;
        this.placeSubject.next(_.cloneDeep(updatedPlace));
      })
    );
  }

  filterPlaces(places: Place[], start: string, game: Game): Place[] {
    const gameStart = moment(start);
    const gameEnd = gameStart.clone().add(45, 'minutes');

    for (let i = 0; i < places.length; i++) {
      const place = places[i];
      place.disabled = true;

      for (let x = 0; x < place.permits.length; x++) {
        const permit = place.permits[x];

        const slot = this.searchSlots(permit.slots, gameStart, gameEnd);

        if (!slot) { continue; }

        if (slot.games && slot.games.length > 0) {
          const conflict = this.checkConflicts(place, slot, game, gameStart, gameEnd);

          // try next
          if (conflict) { continue; }
        }

        place.disabled = false;
      }
    }

    return places;
  }

  searchSlots(slots: Slot[], gameStart, gameEnd) {
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const slotStart = moment(slot.start);
      const slotEnd = moment(slot.end);

      // check if game start time fits into slot
      if (gameStart.isSameOrAfter(slotStart) && gameEnd.isSameOrBefore(slotEnd)) {
        return slot;
      }
    }
  }

  checkConflicts(place: Place, slot: Slot, game: Game, gameStart: any, gameEnd: any) {
    for (let i = 0; i < slot.games.length; i++) {
      const start = moment(slot.games[i].start);
      const end = start.clone().add(45, 'minutes');

      // same id, skip
      if (game && (game._id === slot.games[i]._id)) { continue; }

      // check if game is same time or between existing game
      if (gameStart.isSame(start) ||
          gameEnd.isSame(end) ||
          gameStart.isBetween(start, end) ||
          gameEnd.isBetween(start, end)
      ) {
        if (place.locations && place.locations.length > 0) {
          for (let x = 0; x < place.locations.length; x++) {
            const location = place.locations[x];
            if (slot.games[i].locations.indexOf(location._id) > -1) { location.disabled = true; }
          }
        } else {
          return true;
        }
      }
    }

    return false;
  }
}
