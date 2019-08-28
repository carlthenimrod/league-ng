import { Address } from './address';
import { Team } from './team';

export interface UserStatus {
  admin?: boolean;
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
  teams?: Team[];
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

export interface UserNotificationStatus {
  read: boolean;
  pending?: boolean;
  accepted?: boolean;
}

export interface UserNotificationResponse {
  type: string;
  action: string;
  status: UserNotificationStatus;
  team?: Team;
  user?: User;
  _id?: string;
  __v?: number;
}

export interface UserNotification {
  type: string;
  action: string;
  message: string;
  status: UserNotificationStatus;
  _id: string;
  team?: Team;
  user?: User;
}

export interface UserNotificationReply {
  notification: UserNotification;
  reply: string;
}
