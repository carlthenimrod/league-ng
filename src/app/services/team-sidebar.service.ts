import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamSidebarService {
  isOpen: boolean;
  isOpenSubject = new BehaviorSubject<boolean>(null);
  isOpen$ = this.isOpenSubject.asObservable();


  constructor() {
    this.isOpen = window.innerWidth >= 1200 ? true : false;
    this.isOpenSubject.next(this.isOpen);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isOpenSubject.next(this.isOpen);
  }
}
