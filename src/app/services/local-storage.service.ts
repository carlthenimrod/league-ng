import { Injectable } from '@angular/core';

import { Me } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  get(): Me;
  get(item: string): string;
  get<T>(item: string): T;
  get<T>(item?: string): string|T|Me {
    if (item) {
      const value = localStorage.getItem(item);

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    const me: Me = {
      _id: localStorage.getItem('_id'),
      email: localStorage.getItem('email'),
      name: JSON.parse(localStorage.getItem('name')),
      fullName: localStorage.getItem('fullName'),
      status: JSON.parse(localStorage.getItem('status')),
      teams: JSON.parse(localStorage.getItem('teams')),
      leagues: JSON.parse(localStorage.getItem('leagues')),
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      client: localStorage.getItem('client')
    };

    const img = localStorage.getItem('img');
    if (img) { me.img = img; }

    return me;
  }

  set(item: Me): void;
  set(item: string, value: any): void;
  set(item: string|Me, value?: any): void {
    if (typeof item !== 'string') {
      localStorage.setItem('_id', item._id);
      localStorage.setItem('email', item.email);
      localStorage.setItem('name', JSON.stringify(item.name));
      localStorage.setItem('fullName', item.fullName);
      localStorage.setItem('status', JSON.stringify(item.status));
      localStorage.setItem('teams', JSON.stringify(item.teams));
      localStorage.setItem('leagues', JSON.stringify(item.leagues));
      localStorage.setItem('access_token', item.access_token);
      localStorage.setItem('refresh_token', item.refresh_token);
      localStorage.setItem('client', item.client);

      item.img ? localStorage.setItem('img', item.img) : localStorage.removeItem('img');
    } else {
      switch (item) {
        case 'leagues':
        case 'teams':
        case 'status':
        case 'fullName':
          localStorage.setItem(item, JSON.stringify(value));
          break;
        default:
          localStorage.setItem(item, value);
      }
    }
  }
}
