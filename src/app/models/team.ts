import { League } from './league';
import { User, Player, Coach, Manager } from './user';

export interface Team {
  name: string;
  leagues?: League[];
  status?: string;
  _id?: string;
  __v?: number;
  players?: Player[];
  coaches?: Coach[];
  managers?: Manager[];
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
