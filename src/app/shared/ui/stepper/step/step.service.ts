import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StepService {
  private _prevSubject = new Subject<void>();
  prev$ = this._prevSubject.asObservable();

  private _nextSubject = new Subject<void>();
  next$ = this._nextSubject.asObservable();

  prev() {
    this._prevSubject.next();
  }

  next() {
    this._nextSubject.next();
  }
}
