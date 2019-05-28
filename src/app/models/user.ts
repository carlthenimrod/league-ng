import { Address } from './address';

export interface UserStatus {
  new?: boolean;
  verified?: boolean;
  online?: boolean;
}

export interface User {
  name: { first: string; last: string; };
  fullName?: string;
  email?: string;
  status?: UserStatus;
  img?: string;
  teams?: [{
    _id: string;
    name: string;
  }];
  address?: Address;
  phone?: string;
  secondary?: string;
  emergency?: {
    name: { first: string; last: string; };
    fullName?: string;
    phone: string;
    secondary?: string;
  };
  comments?: string;
  roles?: [string];
  _id?: string;
  __v?: number;
}

export interface Player extends User {
  name: { first: string; last: string; };
  fullName?: string;
  email?: string;
  _id?: string;
  __v?: number;
}

export interface Coach extends User {
  name: { first: string; last: string; };
  fullName?: string;
  email?: string;
  _id?: string;
  __v?: number;
}

export interface Manager extends User {
  name: { first: string; last: string; };
  fullName?: string;
  email?: string;
  _id?: string;
  __v?: number;
}

