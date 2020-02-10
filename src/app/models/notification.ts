import { League } from './league';
import { Team } from './team';
import { User } from './user';

export interface NotificationStatus {
  read: boolean;
  pending?: boolean;
  accepted?: boolean;
}

export interface NotificationResponse {
  type: string;
  action: string;
  status: NotificationStatus;
  league?: League;
  team?: Team;
  user?: User;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: string;
}

export interface Notification {
  type: string;
  message: string;
  status: NotificationStatus;
  league?: League;
  team?: Team;
  user?: User;
  date: string;
  updated: boolean;
  _id: string;
}
