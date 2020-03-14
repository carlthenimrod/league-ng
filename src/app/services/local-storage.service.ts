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
    if (typeof item === 'object') {
      for (const [keys, values] of Object.entries(item)) {
        localStorage.setItem(
          keys,
          typeof values === 'object'
            ? JSON.stringify(values)
            : values
          );
      }

      item.img ? localStorage.setItem('img', item.img) : localStorage.removeItem('img');
    } else if (typeof item === 'string') {
        typeof value === 'object'
          ? localStorage.setItem(item, JSON.stringify(value))
          : localStorage.setItem(item, value);
    }
  }
}
