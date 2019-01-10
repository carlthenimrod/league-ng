import { Address } from './address';

export interface User {
  name: string;
  email?: string;
  status?: string;
  address?: Address;
  phone?: string;
  secondary?: string;
  emergency?: {
    name: string;
    phone: string;
    secondary?: string;
  };
  comments?: string;
  _id?: string;
  __v?: number;
}

export interface Player extends User {
  name: string;
  email?: string;
  status?: string;
  _id?: string;
  __v?: number;
}

export interface Coach extends User {
  name: string;
  email?: string;
  status?: string;
  _id?: string;
  __v?: number;
}

export interface Manager extends User {
  name: string;
  email?: string;
  status?: string;
  _id?: string;
  __v?: number;
}

