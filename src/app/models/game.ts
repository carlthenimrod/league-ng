import { League, Group } from './league';
import { Place } from './place';

export interface Game {
  home: {
    _id: string;
    name: string;
    score?: string;
  };
  away: {
    _id: string;
    name: string;
    score?: string;
  };
  start?: string;
  time?: boolean;
  place?: Place;
  league?: League;
  group?: Group;
  _id?: string;
  __v?: number;
}
