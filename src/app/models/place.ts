import { Address } from './address';
import { Game } from './game';

export interface Slot {
  start: string;
  end: string;
  games?: [{
    locations: [string];
    _id: string;
    start: string;
  }];
  _id?: string;
  __v?: string;
}

export interface PlaceLocation {
  name: string;
  disabled?: boolean;
  _id?: string;
  __v?: string;
}

export interface Permit {
  label: string;
  slots?: Slot[];
  _id?: string;
  __v?: string;
}

export interface Place {
  name: string;
  address?: Address;
  locations?: PlaceLocation[];
  permits?: Permit[];
  disabled?: boolean;
  _id?: string;
  __v?: string;
}
