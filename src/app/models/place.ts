import { Address } from './address';

export interface Slot {
  start: string;
  end: string;
}

export interface PlaceLocation {
  name: string;
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
  _id?: string;
  __v?: string;
}
