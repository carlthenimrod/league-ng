import { Address } from './address';

export interface PlaceLocation {
  name: string;
  _id?: string;
  __v?: string;
}

export interface Permit {
  name: string;
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
