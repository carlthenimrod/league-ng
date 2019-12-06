import { League } from './league';
import { User } from './user';
import { Game } from './game';

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

export interface TeamRosterResponse {
  user: User;
  roles: string[];
}

export interface TeamRoster {
  role: string;
  users: User[];
}

export interface Team {
  name: string;
  img?: string;
  roster?: TeamRoster[];
  status?: Status;
  pending?: User[];
  feed?: Message[];
  users?: User[];
  leagues?: League[];
  schedule?: Game[];
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
  img: string;
  leagues: League[];
  roster?: TeamRosterResponse[];
  status?: Status;
  pending?: User[];
  feed?: Message[];
  _id: string;
  __v: number;
}
