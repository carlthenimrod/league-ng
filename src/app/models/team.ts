import { League } from './league';
import { User } from './user';

export interface RoleGroup {
  role: string;
  users: User[];
}

export interface Status {
  new?: boolean;
  verified?: boolean;
  online?: boolean;
}

export interface Message {
  type: string;
  body: string;
  from?: User;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  __v?: string;
}

export interface Team {
  name: string;
  roster?: RoleGroup[];
  status?: Status;
  feed?: Message[];
  users?: User[];
  leagues?: League[];
  position?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  points?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  _id?: string;
  __v?: number;
}

export interface TeamResponse {
  name: string;
  leagues: League[];
  roster?: User[];
  status?: Status;
  feed?: Message[];
  _id: string;
  __v: number;
}
