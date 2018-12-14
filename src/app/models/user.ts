export interface User {
  name: string;
  email?: string;
  status?: string;
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

