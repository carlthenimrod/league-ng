import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamSidebarService {
  sidebarOpen: boolean;
  sidebarOpenSubject: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarOpen = (window.innerWidth >= 1200) ? true : false;

    this.sidebarOpenSubject = new BehaviorSubject(this.sidebarOpen);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpenSubject.next(this.sidebarOpen);
  }

  $sidebarOpen() {
    return this.sidebarOpenSubject.asObservable();
  }
}