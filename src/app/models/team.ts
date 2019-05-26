import { League } from './league';
import { User } from './user';

export interface RosterGroup {
  role: string;
  users: User[];
}

export interface Team {
  name: string;
  status?: string;
  users?: {
    user: User;
    roles: [string];
  }[];
  roster?: RosterGroup[];
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
  roster: [{
    user: User;
    roles: [string];
  }];
  status: string;
  _id: string;
  __v: number;
}
