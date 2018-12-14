import { League } from './league';
import { User, Player, Coach, Manager } from './user';

export interface Team {
  name: string;
  status?: string;
  leagues?: League[];
  players?: Player[];
  coaches?: Coach[];
  managers?: Manager[];
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
