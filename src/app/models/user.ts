import { Address } from './address';

export interface User {
  name: { first: string; last: string; };
  fullName?: string;
  email?: string;
  status?: string;
  onlineStatus?: string;
  img?: string;
  verified?: boolean;
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

